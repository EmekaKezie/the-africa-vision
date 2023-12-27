export interface IActivity {
  id: string;
  assigneeId: string;
  assigneeFirstname?: string;
  assigneeLastname?: string;
  assignorId?: string;
  title: string;
  description:string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
