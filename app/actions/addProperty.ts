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
  images: string[]; // Represents selected images
}
async function addProperty(formData: FormDataType) {
  const amenities = formData.getAll('amenities');
  const images = formData
    .getAll('images')
    .filter((image) => image.name != '')
    .map((image) => image.name);

  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    images,
  };
  console.log(propertyData);
}
export default addProperty;
