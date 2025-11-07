import { NextResponse } from "next/server";
import { ZodError } from "zod";
import ApiError from "./apiError";

/**
 * Happy Handling the error data globally
 * @param error - Taking the error data in json
 * @returns - Handled the error data
 */

export function handleError(error: any) {
  // Zod validation error
  if (error instanceof ZodError) {
    const formatted = error.issues.map(issue => issue.message).join(", ");
    return NextResponse.json({ success: false, message: formatted }, { status: 400 });
  }

  // Custom API error
  if (error instanceof ApiError) {
    return NextResponse.json({ success: false, message: error.message }, { status: error.status });
  }

  // Unknown error
  console.error("SERVER ERROR:", error);
  return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
}
