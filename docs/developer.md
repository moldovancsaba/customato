# Developer Documentation

## Project Overview
Customato is a Kanban-style task management system built using Next.js, MongoDB, and Tailwind CSS.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: API routes with Next.js, MongoDB for persistence
- **Deployment**: Vercel
- **Authentication**: None (yet)
- **State Management**: Local state with useState/useEffect

## API Endpoints
### `GET /api/cards`
Returns all Kanban cards.

### `POST /api/cards`
Creates a new card.

#### Request Body:
\`\`\`json
{
  "text": "New Card",
  "column": "To Do"
}
\`\`\`

#### Response:
\`\`\`json
{
  "message": "Card created successfully",
  "id": "67b29a6bbafa46ce39efae65"
}
\`\`\`

### `PUT /api/cards/:id`
Updates a card’s position or text.

### `DELETE /api/cards/:id`
Deletes a card.

## Database Schema (MongoDB)
**Collection: cards**
\`\`\`json
{
  "_id": "ObjectId",
  "text": "string",
  "column": "string",
  "updatedAt": "ISODate"
}
\`\`\`

## Deployment
- Push to GitHub → Auto deploys to Vercel

## Known Issues
- No authentication
- No real-time sync
- No board persistence beyond column updates

