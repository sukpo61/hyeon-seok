export interface NotificationResponse {
  id: string;
  title: string;
  content: string;
  name: string;
  type: string;
  createdAt: string;
  lastEventId: string;
  hostId?: string;
  partyId?: string;
}
