import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {

        const formData = await req.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const message = formData.get("message");
        const cv = formData.get("cv");

        if (!name || !email || !cv) {
            return NextResponse.json(
                { error: "Required fields missing" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await cv.arrayBuffer());

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.verify();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Job Application - ${name}`,
            html: `
                <h2>New Job Application</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

                <p><strong>Message:</strong></p>
                <p>${message || "No message provided"}</p>

                <hr/>

                <p>Submitted: ${new Date().toLocaleString("en-IN")}</p>
            `,
            attachments: [
                {
                    filename: cv.name,
                    content: buffer,
                },
            ],
        });

        return NextResponse.json({ success: true });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { error: "Application failed to send" },
            { status: 500 }
        );
    }
}