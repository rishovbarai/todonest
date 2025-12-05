#!/bin/bash

# API Testing Script for Railway Backend
API_BASE="https://todo-backend-production-8ea7.up.railway.app/api"

echo "🧪 Testing Todo API Endpoints"
echo "================================"
echo ""

# Test 1: Get all todos (should be empty initially)
echo "1️⃣  GET /todos - Get all todos"
RESPONSE=$(curl -s "$API_BASE/todos")
echo "Response: $RESPONSE"
echo ""

# Test 2: Create a todo
echo "2️⃣  POST /todos - Create a new todo"
CREATE_RESPONSE=$(curl -s -X POST "$API_BASE/todos" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo from API", "order": 0}')
echo "Response: $CREATE_RESPONSE"
TODO_ID=$(echo $CREATE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo "Created Todo ID: $TODO_ID"
echo ""

# Test 3: Get all todos again
echo "3️⃣  GET /todos - Get all todos (should have 1)"
curl -s "$API_BASE/todos" | python3 -m json.tool 2>/dev/null || curl -s "$API_BASE/todos"
echo ""
echo ""

# Test 4: Get single todo
if [ ! -z "$TODO_ID" ]; then
  echo "4️⃣  GET /todos/$TODO_ID - Get single todo"
  curl -s "$API_BASE/todos/$TODO_ID" | python3 -m json.tool 2>/dev/null || curl -s "$API_BASE/todos/$TODO_ID"
  echo ""
  echo ""
fi

# Test 5: Update todo
if [ ! -z "$TODO_ID" ]; then
  echo "5️⃣  PATCH /todos/$TODO_ID - Update todo (mark as completed)"
  curl -s -X PATCH "$API_BASE/todos/$TODO_ID" \
    -H "Content-Type: application/json" \
    -d '{"completed": true}' | python3 -m json.tool 2>/dev/null || curl -s -X PATCH "$API_BASE/todos/$TODO_ID" -H "Content-Type: application/json" -d '{"completed": true}'
  echo ""
  echo ""
fi

# Test 6: Reorder todos
echo "6️⃣  POST /todos/reorder - Reorder todos"
curl -s -X POST "$API_BASE/todos/reorder" \
  -H "Content-Type: application/json" \
  -d '[{"id": '$TODO_ID', "order": 5}]' | python3 -m json.tool 2>/dev/null || curl -s -X POST "$API_BASE/todos/reorder" -H "Content-Type: application/json" -d '[{"id": '$TODO_ID', "order": 5}]'
echo ""
echo ""

# Test 7: Delete todo
if [ ! -z "$TODO_ID" ]; then
  echo "7️⃣  DELETE /todos/$TODO_ID - Delete todo"
  curl -s -X DELETE "$API_BASE/todos/$TODO_ID"
  echo ""
  echo "Deleted Todo ID: $TODO_ID"
  echo ""
fi

# Test 8: Verify deletion
echo "8️⃣  GET /todos - Verify todo was deleted"
curl -s "$API_BASE/todos" | python3 -m json.tool 2>/dev/null || curl -s "$API_BASE/todos"
echo ""
echo ""

echo "✅ API Testing Complete!"
echo ""
echo "If all tests passed, your backend is working correctly! 🎉"

