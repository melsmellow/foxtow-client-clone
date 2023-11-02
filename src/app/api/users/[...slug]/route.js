import { BASE_URL, USER_API_SUBPATH } from "@/constants";
import { createRouteHandler } from "@/utils";

async function handler(request) {
  return createRouteHandler(BASE_URL, USER_API_SUBPATH)(request);
}

export async function GET(request) {
  return handler(request);
}

export async function HEAD(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}

export async function PUT(request) {
  return handler(request);
}

export async function DELETE(request) {
  return handler(request);
}

export async function PATCH(request) {
  return handler(request);
}
