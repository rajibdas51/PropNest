'use server';
interface FormDataType {
  type: string;
  name: string;
  description?: string;
  location: {
    street?: string;
    city: string;
    state: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[]; // Assuming multiple amenities can be selected
  rates?: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
  seller_info: {
    name?: string;
    email: string;
    phone?: string;
  };
  images: FileList; // Represents selected images
}
async function addProperty(formData: FormDataType) {
  console.log(formData.getAll('amenities'));
}
export default addProperty;
