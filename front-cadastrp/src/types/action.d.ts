import { formCadClient} from './type'


type InsertUpdateCadClient = (id:number,formData: formCadClient) => Promise<void>;
//type UpdateCadClient = (id: number, formData: formCadClient) => Promise<void>;
type GetDataClient = (page: number, pageSize: number) => Promise<Pagination<formCadClient[]>>;