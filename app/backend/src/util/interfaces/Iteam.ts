export default interface Iteam{
  listAll(): Promise<Array<{
    id: number,
    teamName: string,
  }>>
  findById(id: number): Promise<{
    id: number,
    teamName: string,
  } | null >
}
