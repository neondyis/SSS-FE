export interface APIService {
  vacuum: string,
  status: string,
  generatedRepairs: string[]
  notes: {_id: string, content: string, image: string}[];
}
