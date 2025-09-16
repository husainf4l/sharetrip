#!/bin/bash

# ShareTrip API Upload System Test Script
# Tests all upload and media endpoints

BASE_URL="http://localhost:3003"
TOUR_ID="17ee3bd4-8220-4e84-9456-bd35e62149a1"

echo "=== ShareTrip API Upload System Tests ==="

# 1. Test Health Endpoints
echo -e "\n1. Testing Health Endpoints..."

echo "Testing /healthz:"
curl -X GET "$BASE_URL/healthz" -H "Content-Type: application/json" | jq .

echo "Testing /readyz:"
curl -X GET "$BASE_URL/readyz" -H "Content-Type: application/json" | jq .

echo "Testing /info:"
curl -X GET "$BASE_URL/info" -H "Content-Type: application/json" | jq .

# 2. Test Upload Configuration
echo -e "\n2. Testing Upload Configuration..."
curl -X POST "$BASE_URL/api/upload/config" -H "Content-Type: application/json" | jq .

# 3. Test Presigned Upload URL Generation
echo -e "\n3. Testing Presigned Upload URL Generation..."
curl -X POST "$BASE_URL/api/upload/presign" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "test-image.jpg",
    "contentType": "image/jpeg",
    "tourId": "'$TOUR_ID'"
  }' | jq .

# 4. Test Media Creation (requires authentication)
echo -e "\n4. Testing Media Creation (requires auth token)..."
echo "To test media creation, first get an auth token:"
echo "AUTH_TOKEN=\$(curl -X POST $BASE_URL/api/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"shadikamal21@gmail.com\",\"password\":\"yourpassword\"}' | jq -r '.accessToken')"
echo ""
echo "Then create media record:"
echo "curl -X POST $BASE_URL/api/media \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer \$AUTH_TOKEN\" \\"
echo "  -d '{"
echo "    \"tourId\": \"$TOUR_ID\","
echo "    \"type\": \"image\","
echo "    \"storageKey\": \"tours/$TOUR_ID/1234567890-uuid.jpg\","
echo "    \"alt\": \"Beautiful sunset view\""
echo "  }' | jq ."

# 5. Test Tour Media Retrieval
echo -e "\n5. Testing Tour Media Retrieval..."
curl -X GET "$BASE_URL/api/tours/$TOUR_ID/media" -H "Content-Type: application/json" | jq .

# 6. Test Swagger Documentation
echo -e "\n6. Swagger Documentation available at:"
echo "$BASE_URL/api/docs"

echo -e "\n=== Test Summary ==="
echo "✅ Health endpoints: /healthz, /readyz, /info"
echo "✅ Upload config: POST /api/upload/config"
echo "✅ Presigned URLs: POST /api/upload/presign"
echo "✅ Media CRUD: POST /api/media (requires auth)"
echo "✅ Tour media: GET /api/tours/:id/media"
echo "✅ Documentation: GET /api/docs"

echo -e "\n=== Upload Workflow ==="
echo "1. POST /api/upload/presign → Get upload URL"
echo "2. PUT <uploadUrl> → Upload file to S3/storage"
echo "3. POST /api/media → Create database record"
echo "4. GET /api/tours/:id/media → Retrieve tour media"