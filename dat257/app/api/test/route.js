export async function GET() {
    console.log("Token:", process.env.CARBON_TOKEN); // Check terminal for this
    return Response.json({ 
      status: "Success!",
      token: process.env.CARBON_TOKEN ? "Exists (hidden for security)" : "Missing!" 
    });
  }