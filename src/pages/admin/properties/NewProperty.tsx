import { useState, ChangeEvent, FormEvent } from 'react';

// Your PropertyForm interface (assuming it's in the same file or imported)
export interface PropertyForm {
  basicInfo: {
    propertyName: string;
    propertyAddress: string;
    locality: string;
  };
  configuration: {
    configurations: {
      bhkType: string;
      area: { value: number | null; unit: string };
      price: { value: number | null; unit: string };
      bookingAmount: { value: number | null; unit: string };
      parking: string;
    }[];
    googleMapLink: string;
    aboutProperty: string;
    aboutBuilder: string;
  };
  propertyDetails: {
    landParcel: { value: number | null; unit: string };
    totalTowers: number | null;
    buildingStructures: string;
    availableTowers: number | null;
  };
  possession: any; // Consider defining this more strictly if possible
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  amenities: {
    indoor: string[];
    outdoor: string[];
    amenityImages: File[];
  };
  mediaAndPlans: {
    videoLinks: string[];
    projectLayoutsImage: File[];
    floorLayoutsImage: File[];
    unitPlanLayoutsImage: File[];
  };
  location: string;
  paymentAndOffers: {
    offerText: string;
    offerImages: File[];
  };
  specifications: {
    specificationImages: File[];
  };
  propertyImages: File[];
}


export default function NewProperty() {
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newIndoorAmenity, setNewIndoorAmenity] = useState('');
  const [newOutdoorAmenity, setNewOutdoorAmenity] = useState('');
  const [newVideoLink, setNewVideoLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<PropertyForm>({
    basicInfo: { propertyName: '', propertyAddress: '', locality: '' },
    configuration: {
      configurations: [{
        bhkType: '',
        area: { value: null, unit: 'sq ft' },
        price: { value: null, unit: 'Cr' },
        bookingAmount: { value: null, unit: 'Lac' },
        parking: '',
      }],
      googleMapLink: '', aboutProperty: '', aboutBuilder: ''
    },
    propertyDetails: {
      landParcel: { value: null, unit: 'Acres' },
      totalTowers: null, buildingStructures: '', availableTowers: null
    },
    possession: null,
    prosAndCons: { pros: [], cons: [] },
    amenities: { indoor: [], outdoor: [], amenityImages: [] },
    mediaAndPlans: { videoLinks: [], projectLayoutsImage: [], floorLayoutsImage: [], unitPlanLayoutsImage: [] },
    location: '',
    paymentAndOffers: { offerText: '', offerImages: [] },
    specifications: { specificationImages: [] },
    propertyImages: []
  });

  // --- Generalized Handlers ---

  // Handles changes for simple string/number inputs within a nested object (e.g., basicInfo.propertyName)
  const handleNestedInputChange = <T extends keyof PropertyForm>(
    section: T,
    fieldName: keyof PropertyForm[T],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as object), // Type assertion needed for generic
        [fieldName]: value,
      },
    }));
  };
  
  // Adds a string item to an array within a nested object (e.g., prosAndCons.pros)
  const handleAddStringItem = (
    section: keyof Pick<PropertyForm, 'prosAndCons' | 'amenities' | 'mediaAndPlans'>,
    arrayKey: 'pros' | 'cons' | 'indoor' | 'outdoor' | 'videoLinks',
    newItem: string,
    clearInputStateFn: () => void
  ) => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: [...(prev[section] as any)[arrayKey], newItem.trim()],
        },
      }));
      clearInputStateFn();
    }
  };

  // Removes a string item from an array by index
  const handleRemoveStringItem = (
    section: keyof Pick<PropertyForm, 'prosAndCons' | 'amenities' | 'mediaAndPlans'>,
    arrayKey: 'pros' | 'cons' | 'indoor' | 'outdoor' | 'videoLinks',
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: (prev[section] as any)[arrayKey].filter((_: any, i: number) => i !== index),
      },
    }));
  };

  // Adds files to a File array (top-level or nested)
  const handleFileUpload = (
    sectionOrKey: keyof PropertyForm | 'propertyImages', // Use 'propertyImages' for top-level
    arrayKeyOrNull: keyof PropertyForm[keyof PropertyForm] | null, // Null if top-level
    files: FileList | null
  ) => {
    if (files) {
      const filesArray = Array.from(files);
      setFormData(prev => {
        if (sectionOrKey === 'propertyImages') {
          return { ...prev, propertyImages: [...prev.propertyImages, ...filesArray] };
        }
        // Nested file array
        const currentSection = prev[sectionOrKey as keyof PropertyForm] as any;
        return {
          ...prev,
          [sectionOrKey]: {
            ...currentSection,
            [arrayKeyOrNull!]: [...currentSection[arrayKeyOrNull!], ...filesArray],
          },
        };
      });
    }
  };

  // Removes a file from a File array by index
  const handleRemoveFile = (
    sectionOrKey: keyof PropertyForm | 'propertyImages',
    arrayKeyOrNull: keyof PropertyForm[keyof PropertyForm] | null,
    index: number
  ) => {
    setFormData(prev => {
      if (sectionOrKey === 'propertyImages') {
        return { ...prev, propertyImages: prev.propertyImages.filter((_, i) => i !== index) };
      }
      // Nested file array
      const currentSection = prev[sectionOrKey as keyof PropertyForm] as any;
      return {
        ...prev,
        [sectionOrKey]: {
          ...currentSection,
          [arrayKeyOrNull!]: currentSection[arrayKeyOrNull!].filter((_: any, i: number) => i !== index),
        },
      };
    });
  };

  // --- Specific Handlers (for more complex updates or simple direct ones) ---

  const handleBasicInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof PropertyForm['basicInfo'], value: string };
    handleNestedInputChange('basicInfo', name, value);
  };
  
  const handlePropertyDetailsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newDetails = { ...prev.propertyDetails };
      if (name.startsWith('landParcel.')) {
        const field = name.split('.')[1] as keyof typeof newDetails.landParcel;
        newDetails.landParcel = {
          ...newDetails.landParcel,
          [field]: field === 'value' ? (value === '' ? null : parseFloat(value)) : value,
        };
      } else {
        const key = name as keyof Omit<PropertyForm['propertyDetails'], 'landParcel'>;
        if (key === 'totalTowers' || key === 'availableTowers') {
          (newDetails[key] as number | null) = value === '' ? null : parseFloat(value);
        } else if (key === 'buildingStructures') {
          newDetails[key] = value;
        }
      }
      return { ...prev, propertyDetails: newDetails };
    });
  };

  const addConfiguration = () => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        configurations: [
          ...prev.configuration.configurations,
          {
            bhkType: '', area: { value: null, unit: 'sq ft' },
            price: { value: null, unit: 'Cr' },
            bookingAmount: { value: null, unit: 'Lac' }, parking: '',
          }
        ]
      }
    }));
  };

  const removeConfiguration = (index: number) => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        configurations: prev.configuration.configurations.filter((_, i) => i !== index)
      }
    }));
  };

  const handleConfigChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newConfigs = [...prev.configuration.configurations];
      const currentConfig = { ...newConfigs[index] };

      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof typeof currentConfig, string];
        // Ensure parent is one of 'area', 'price', 'bookingAmount'
        if (parent === 'area' || parent === 'price' || parent === 'bookingAmount') {
            (currentConfig[parent] as any) = {
              ...(currentConfig[parent] as object),
              [child]: child === 'value' ? (value === '' ? null : Number(value)) : value
            };
        }
      } else {
        (currentConfig as any)[name] = value;
      }
      newConfigs[index] = currentConfig;
      return { ...prev, configuration: { ...prev.configuration, configurations: newConfigs }};
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
  
    try {
      const formPayload = new FormData();
  
      // Append all files
      formData.propertyImages.forEach(file => formPayload.append('propertyImages', file));
      formData.amenities.amenityImages.forEach(file => formPayload.append('amenityImages', file));
      formData.mediaAndPlans.unitPlanLayoutsImage.forEach(file => formPayload.append('unitPlanLayoutsImage', file));
      formData.mediaAndPlans.floorLayoutsImage.forEach(file => formPayload.append('floorLayoutsImage', file));
      formData.mediaAndPlans.projectLayoutsImage.forEach(file => formPayload.append('projectLayoutsImage', file));
      formData.paymentAndOffers.offerImages.forEach(file => formPayload.append('offerImages', file));
      formData.specifications.specificationImages.forEach(file => formPayload.append('specificationImages', file));
  
      // Append JSON data (excluding file arrays which are handled above)
      const jsonData = {
        basicInfo: formData.basicInfo,
        configuration: { // Configurations array itself doesn't have files, so it's fine
          ...formData.configuration,
          configurations: formData.configuration.configurations,
        },
        propertyDetails: formData.propertyDetails,
        possession: formData.possession,
        prosAndCons: formData.prosAndCons,
        amenities: {
          indoor: formData.amenities.indoor,
          outdoor: formData.amenities.outdoor,
        },
        mediaAndPlans: {
          videoLinks: formData.mediaAndPlans.videoLinks,
        },
        location: formData.location,
        paymentAndOffers: {
          offerText: formData.paymentAndOffers.offerText,
        },
        // specifications: {} // No non-file data in specifications per current interface
      };
      formPayload.append('data', JSON.stringify(jsonData));
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/createproperty`, {
        method: 'POST',
        body: formPayload,
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create property');
      }
  
      setSubmitSuccess(true);
      // console.log('Property created:', data);
      // Optionally reset form:
      // setFormData({ ...initialState }); // You'd need to define initialState
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  console.log('Current formData:', formData);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Property</h2>

        {/* Basic Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Name</label>
              <input
                type="text"
                name="propertyName"
                value={formData.basicInfo.propertyName}
                onChange={handleBasicInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Address</label>
              <textarea
                name="propertyAddress"
                value={formData.basicInfo.propertyAddress}
                onChange={handleBasicInfoChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Locality</label>
              <input
                type="text"
                name="locality"
                value={formData.basicInfo.locality}
                onChange={handleBasicInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Configuration</h3>
          {formData.configuration.configurations.map((config, index) => (
            <div key={index} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Configuration {index + 1}</h4>
                {formData.configuration.configurations.length > 1 && (
                  <button type="button" onClick={() => removeConfiguration(index)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">BHK Type</label>
                  <select name="bhkType" value={config.bhkType} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="">Select BHK Type</option>
                    {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={`${num} BHK`}>{num} BHK</option>)}
                    <option value="Plot">Plot</option>
                    <option value="Villa">Villa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area</label>
                  <div className="flex gap-2">
                    <input type="number" name="area.value" value={config.area.value ?? ''} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Value"/>
                    <input type="text" name="area.unit" value={config.area.unit} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Unit"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <div className="flex gap-2">
                    <input type="number" name="price.value" value={config.price.value ?? ''} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Value"/>
                    <select name="price.unit" value={config.price.unit} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="Cr">Cr</option>
                      <option value="Lac">Lac</option>
                      <option value="K">K</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Booking Amount</label>
                  <div className="flex gap-2">
                    <input type="number" name="bookingAmount.value" value={config.bookingAmount.value ?? ''} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Value"/>
                    <select name="bookingAmount.unit" value={config.bookingAmount.unit} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="Lac">Lac</option>
                      <option value="K">K</option>
                      <option value="Cr">Cr</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parking</label>
                  <select name="parking" value={config.parking} onChange={(e) => handleConfigChange(e, index)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="">Select Parking</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Limited">Limited</option>
                    <option value="1 Covered">1 Covered</option>
                     <option value="2 Covered">2 Covered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addConfiguration} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">+ Add Configuration</button>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Google Map Link</label>
            <input type="url" value={formData.configuration.googleMapLink} onChange={(e) => handleNestedInputChange('configuration', 'googleMapLink', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://maps.google.com/..."/>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">About Property</label>
            <textarea value={formData.configuration.aboutProperty} onChange={(e) => handleNestedInputChange('configuration', 'aboutProperty', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Brief description of the property..."/>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">About Builder</label>
            <textarea value={formData.configuration.aboutBuilder} onChange={(e) => handleNestedInputChange('configuration', 'aboutBuilder', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Information about the builder..."/>
          </div>
        </div>

        {/* Property Images Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Property Images</h3>
          <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload('propertyImages', null, e.target.files)} className="file-input" />
          <div className="image-preview-grid mt-4">
            {formData.propertyImages.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img src={URL.createObjectURL(image)} alt={`Property ${index + 1}`} />
                <button type="button" onClick={() => handleRemoveFile('propertyImages', null, index)} className="remove-image-btn">×</button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Land Parcel</label>
                    <div className="flex gap-2">
                        <input type="number" name="landParcel.value" value={formData.propertyDetails.landParcel.value ?? ''} onChange={handlePropertyDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Value"/>
                        <input type="text" name="landParcel.unit" value={formData.propertyDetails.landParcel.unit} onChange={handlePropertyDetailsChange} className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm" placeholder="Unit"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Total Towers</label>
                    <input type="number" name="totalTowers" value={formData.propertyDetails.totalTowers ?? ''} onChange={handlePropertyDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Building Structures</label>
                    <textarea name="buildingStructures" value={formData.propertyDetails.buildingStructures} onChange={handlePropertyDetailsChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., 2 Basements + Ground + 14 Floors"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Available Towers</label>
                    <input type="number" name="availableTowers" value={formData.propertyDetails.availableTowers ?? ''} onChange={handlePropertyDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                 {/* Possession - Example for a text input, adjust as needed (e.g., Date picker) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Possession</label>
                    <input 
                        type="text" 
                        value={formData.possession || ''} 
                        onChange={(e) => setFormData(prev => ({ ...prev, possession: e.target.value }))} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="e.g., Ready to move, Dec 2025"
                    />
                </div>
            </div>
        </div>


        {/* Pros and Cons Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Pros and Cons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pros</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={newPro} onChange={(e) => setNewPro(e.target.value)} placeholder="Add a pro" className="input-text flex-grow"/>
                <button type="button" onClick={() => handleAddStringItem('prosAndCons', 'pros', newPro, () => setNewPro(''))} className="btn-primary-sm">Add</button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {formData.prosAndCons.pros.map((pro, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{pro}</span>
                    <button type="button" onClick={() => handleRemoveStringItem('prosAndCons', 'pros', index)} className="text-red-500 hover:text-red-700 text-xs">×</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cons</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={newCon} onChange={(e) => setNewCon(e.target.value)} placeholder="Add a con" className="input-text flex-grow"/>
                <button type="button" onClick={() => handleAddStringItem('prosAndCons', 'cons', newCon, () => setNewCon(''))} className="btn-primary-sm">Add</button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {formData.prosAndCons.cons.map((con, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{con}</span>
                    <button type="button" onClick={() => handleRemoveStringItem('prosAndCons', 'cons', index)} className="text-red-500 hover:text-red-700 text-xs">×</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indoor Amenities</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={newIndoorAmenity} onChange={(e) => setNewIndoorAmenity(e.target.value)} placeholder="Add indoor amenity" className="input-text flex-grow"/>
                <button type="button" onClick={() => handleAddStringItem('amenities', 'indoor', newIndoorAmenity, () => setNewIndoorAmenity(''))} className="btn-primary-sm">Add</button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {formData.amenities.indoor.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item}</span>
                    <button type="button" onClick={() => handleRemoveStringItem('amenities', 'indoor', index)} className="text-red-500 hover:text-red-700 text-xs">×</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outdoor Amenities</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={newOutdoorAmenity} onChange={(e) => setNewOutdoorAmenity(e.target.value)} placeholder="Add outdoor amenity" className="input-text flex-grow"/>
                <button type="button" onClick={() => handleAddStringItem('amenities', 'outdoor', newOutdoorAmenity, () => setNewOutdoorAmenity(''))} className="btn-primary-sm">Add</button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {formData.amenities.outdoor.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item}</span>
                    <button type="button" onClick={() => handleRemoveStringItem('amenities', 'outdoor', index)} className="text-red-500 hover:text-red-700 text-xs">×</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amenity Images</label>
            <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload('amenities', 'amenityImages', e.target.files)} className="file-input mt-1" />
            <div className="image-preview-grid mt-4">
              {formData.amenities.amenityImages.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img src={URL.createObjectURL(image)} alt={`Amenity ${index + 1}`} />
                  <button type="button" onClick={() => handleRemoveFile('amenities', 'amenityImages', index)} className="remove-image-btn">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media and Plans Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Media and Plans</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Links</label>
            <div className="flex gap-2 mb-3">
              <input type="url" value={newVideoLink} onChange={(e) => setNewVideoLink(e.target.value)} placeholder="Add YouTube/Vimeo link" className="input-text flex-grow"/>
              <button type="button" onClick={() => handleAddStringItem('mediaAndPlans', 'videoLinks', newVideoLink, () => setNewVideoLink(''))} className="btn-primary-sm">Add</button>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {formData.mediaAndPlans.videoLinks.map((link, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="truncate w-60" title={link}>{link}</span>
                  <button type="button" onClick={() => handleRemoveStringItem('mediaAndPlans', 'videoLinks', index)} className="text-red-500 hover:text-red-700 text-xs">×</button>
                </li>
              ))}
            </ul>
          </div>
          {[
            { label: 'Project Layout Images', key: 'projectLayoutsImage' },
            { label: 'Floor Layout Images', key: 'floorLayoutsImage' },
            { label: 'Unit Plan Layout Images', key: 'unitPlanLayoutsImage' },
          ].map(upload => (
            <div key={upload.key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{upload.label}</label>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload('mediaAndPlans', upload.key as any, e.target.files)} className="file-input mt-1" />
              <div className="image-preview-grid mt-4">
                {(formData.mediaAndPlans[upload.key as keyof typeof formData.mediaAndPlans] as File[]).map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={URL.createObjectURL(image)} alt={`${upload.label} ${index + 1}`} />
                    <button type="button" onClick={() => handleRemoveFile('mediaAndPlans', upload.key as any, index)} className="remove-image-btn">×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Location Details</h3>
            <textarea 
                value={formData.location} 
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} 
                rows={4} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                placeholder="Describe the location, nearby landmarks, connectivity, etc."
            />
        </div>

        {/* Payment and Offers Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Payment and Offers</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Offer Text / Payment Plan Details</label>
                <textarea 
                    value={formData.paymentAndOffers.offerText} 
                    onChange={(e) => handleNestedInputChange('paymentAndOffers','offerText', e.target.value)}
                    rows={4} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                    placeholder="Enter details about special offers, payment plans, etc."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Offer Images</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => handleFileUpload('paymentAndOffers', 'offerImages', e.target.files)} 
                    className="file-input mt-1" 
                />
                <div className="image-preview-grid mt-4">
                    {formData.paymentAndOffers.offerImages.map((image, index) => (
                        <div key={index} className="image-preview-item">
                            <img src={URL.createObjectURL(image)} alt={`Offer Image ${index + 1}`} />
                            <button type="button" onClick={() => handleRemoveFile('paymentAndOffers', 'offerImages', index)} className="remove-image-btn">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Specifications</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Specification Images</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => handleFileUpload('specifications', 'specificationImages', e.target.files)} 
                    className="file-input mt-1" 
                />
                <div className="image-preview-grid mt-4">
                    {formData.specifications.specificationImages.map((image, index) => (
                        <div key={index} className="image-preview-item">
                            <img src={URL.createObjectURL(image)} alt={`Specification Image ${index + 1}`} />
                            <button type="button" onClick={() => handleRemoveFile('specifications', 'specificationImages', index)} className="remove-image-btn">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Submit Button and Messages */}
        <div className="mt-8 space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors text-lg font-semibold flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Submitting...
              </>
            ) : (
              'Create Property'
            )}
          </button>

          {submitSuccess && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 shadow">
              <p className="font-semibold">✓ Property created successfully!</p>
            </div>
          )}

          {submitError && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 shadow">
              <p className="font-semibold">⚠️ Submission Error</p>
              <p className="mt-1 text-sm">{submitError}</p>
            </div>
          )}
        </div>
      </form>
      <style jsx global>{`
        .file-input {
          display: block;
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.875rem; /* text-sm */
          color: #4b5563; /* gray-700 */
          background-color: #fff;
        }
        .file-input::file-selector-button {
          margin-right: 0.75rem; /* mr-3 */
          padding: 0.5rem 1rem; /* py-2 px-4 */
          border-radius: 0.375rem; /* rounded-md */
          border: 0;
          font-size: 0.875rem; /* text-sm */
          font-weight: 600; /* font-semibold */
          background-color: #eef2ff; /* indigo-50 */
          color: #4338ca; /* indigo-700 */
          cursor: pointer;
        }
        .file-input::file-selector-button:hover {
          background-color: #e0e7ff; /* indigo-100 */
        }
        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
        }
        .image-preview-item {
          position: relative;
          border: 1px solid #e5e7eb; /* gray-200 */
          border-radius: 0.375rem; /* rounded-lg */
          overflow: hidden;
        }
        .image-preview-item img {
          width: 100%;
          height: 100px;
          object-fit: cover;
        }
        .remove-image-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background-color: rgba(239, 68, 68, 0.8); /* bg-red-500 with opacity */
          color: white;
          border: none;
          border-radius: 9999px; /* rounded-full */
          width: 1.5rem; /* w-6 */
          height: 1.5rem; /* h-6 */
          font-size: 1rem;
          line-height: 1.5rem;
          text-align: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .image-preview-item:hover .remove-image-btn {
          opacity: 1;
        }
        .input-text {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
        }
        .input-text:focus {
          border-color: #6366f1; /* indigo-500 */
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 2px #6366f1; /* ring-indigo-500 */
        }
        .btn-primary-sm {
          padding: 0.5rem 1rem;
          background-color: #4f46e5; /* indigo-600 */
          color: white;
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          white-space: nowrap;
        }
        .btn-primary-sm:hover {
          background-color: #4338ca; /* indigo-700 */
        }
      `}</style>
    </div>
  );
}