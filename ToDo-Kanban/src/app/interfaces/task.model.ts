// Estrutura de como as novas Tasks vao ser
interface Task {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status:'notStarted' | 'inProgress' | 'completed' | 'abandoned';
}
