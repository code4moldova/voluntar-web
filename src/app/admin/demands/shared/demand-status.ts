export enum DemandStatus {
  new = 'new',
  confirmed = 'confirmed',
  in_process = 'in_process',
  canceled = 'canceled',
  solved = 'solved',
  archived = 'archived',
}

export function l10nDemandStatus(this: void, status: DemandStatus): string {
  return `DemandStatus.${status}`;
}
