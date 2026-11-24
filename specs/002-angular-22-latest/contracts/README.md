# Contract Preservation

The migration does not change the frontend HTTP contract:

| Operation | Method | URL | Body |
| --- | --- | --- | --- |
| List tasks | GET | `http://localhost:8080/listTasks` | none |
| Create task | POST | `http://localhost:8080/createTask` | `{ "title": "<title>" }` |

Expected success data:

```json
{ "id": 1, "title": "Study Angular" }
```
