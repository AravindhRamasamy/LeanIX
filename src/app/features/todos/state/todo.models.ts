export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
  }
  
  export interface GraphQLResponse<T> {
    data: T;
  }
  
  // Response structure for fetching todos
  export interface TodosResponse {
    todos: Todo[];
  }