export interface Room {
  roomId: number;
  roomName: string;
  seatNumber: number;
  columns: number;
  building: string;
  roomDetailsId?: number | null;
  roomDetails?: RoomDetail | null;
}

export interface RoomDetail {
  roomDetailsId: number;
  columnName: string;
  rowCapacity: number;
  roomId: number;
}
export interface RoomDetails {
    columnName: string;
    rowCapacity: number;
}
