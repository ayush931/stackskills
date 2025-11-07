/**
 * Give the searched result
 * @param request - Takes the data/input through params via search bar
 * @returns - Final response that is being given through params
 */

import connectionToDB from "@/database/dbConnection";
import { RoleGroups } from "@/middlewares/helper";
import { withRoleAuth } from "@/middlewares/role";
import School from "@/schema/school";
import ApiError from "@/utils/apiError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // check authentication and role - pass the request object
    const authCheck = await withRoleAuth(RoleGroups.ADMIN_ONLY)(request);
    if (authCheck) return authCheck;

    // Connect to database
    await connectionToDB();

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Fetch organizations in descending order (newest first)
    const organizations = await School.find()
      .sort({ createdAt: -1 }) // -1 for descending order
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    // Get total count for pagination
    const totalCount = await School.countDocuments();

    return NextResponse.json({
      success: true,
      data: organizations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalRecords: totalCount,
        recordsPerPage: limit,
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new ApiError(500, String(error));
  }
}