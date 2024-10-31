
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        return NextResponse.json(
            {message: "user created successfully!"}, { status: 200 }
        )
    } catch (error: any) {
        console.log(error);

        // Check if the error is a unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: `Unique constraint failed on the ${error.meta.target} field.` },
                { status: 409 }  // 409 Conflict for duplicate entries
            );
        }

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}