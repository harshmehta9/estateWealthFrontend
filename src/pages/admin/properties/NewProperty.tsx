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
  possession: any;
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

import { useState } from 'react';

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
    basicInfo: {
      propertyName: '',
      propertyAddress: '',
      locality: ''
    },
    configuration: {
      configurations: [{
        bhkType: '',
        area: { value: null, unit: 'sq ft' },
        price: { value: null, unit: 'Cr' },
        bookingAmount: { value: null, unit: 'Lac' },
        parking: '',
      }],
      googleMapLink: '',
      aboutProperty: '',
      aboutBuilder: ''
    },
    propertyDetails: {
      landParcel: { value: null, unit: 'Acres' },
      totalTowers: null,
      buildingStructures: '',
      availableTowers: null
    },
    possession: null,
    prosAndCons: {
      pros: [],
      cons: []
    },
    amenities: {
      indoor: [],
      outdoor: [],
      amenityImages: []
    },
    mediaAndPlans: {
      videoLinks: [],
      projectLayoutsImage: [],
      floorLayoutsImage: [],
      unitPlanLayoutsImage: []
    },
    location: '',
    paymentAndOffers: {
      offerText: '',
      offerImages: []
    },
    specifications: {
      specificationImages: []
    },
    propertyImages: []
  });

    


  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      propertyImages: prev.propertyImages.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setFormData(prev => ({
          ...prev,
          propertyImages: [...prev.propertyImages, ...Array.from(files)]
        }));
      }
    };

    const handlePropertyDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name.includes('landParcel')) {
        const [_, field] = name.split('.');
        setFormData(prev => ({
          ...prev,
          propertyDetails: {
            ...prev.propertyDetails,
            landParcel: {
              ...prev.propertyDetails.landParcel,
              [field]: field === 'value' ? parseFloat(value) || 0 : value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          propertyDetails: {
            ...prev.propertyDetails,
            [name]: name === 'buildingStructures' ? value : parseFloat(value) || 0
          }
        }));
      }
    };

  
  const handleAddPro = () => {
    if (newPro.trim()) {
      setFormData(prev => ({
        ...prev,
        prosAndCons: {
          ...prev.prosAndCons,
          pros: [...prev.prosAndCons.pros, newPro.trim()]
        }
      }));
      setNewPro('');
    }
  };
  
  const handleAddCon = () => {
    if (newCon.trim()) {
      setFormData(prev => ({
        ...prev,
        prosAndCons: {
          ...prev.prosAndCons,
          cons: [...prev.prosAndCons.cons, newCon.trim()]
        }
      }));
      setNewCon('');
    }
  };
  
  const handleRemovePro = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prosAndCons: {
        ...prev.prosAndCons,
        pros: prev.prosAndCons.pros.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleRemoveCon = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prosAndCons: {
        ...prev.prosAndCons,
        cons: prev.prosAndCons.cons.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddIndoorAmenity = () => {
    if (newIndoorAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          indoor: [...prev.amenities.indoor, newIndoorAmenity.trim()]
        }
      }));
      setNewIndoorAmenity('');
    }
  };
  
  const handleRemoveIndoorAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        indoor: prev.amenities.indoor.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleAddOutdoorAmenity = () => {
    if (newOutdoorAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          outdoor: [...prev.amenities.outdoor, newOutdoorAmenity.trim()]
        }
      }));
      setNewOutdoorAmenity('');
    }
  };
  
  const handleRemoveOutdoorAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        outdoor: prev.amenities.outdoor.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleAmenityImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          amenityImages: [...prev.amenities.amenityImages, ...Array.from(files)]
        }
      }));
    }
  };
  
  const handleRemoveAmenityImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        amenityImages: prev.amenities.amenityImages.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddVideoLink = () => {
    if (newVideoLink.trim()) {
      setFormData(prev => ({
        ...prev,
        mediaAndPlans: {
          ...prev.mediaAndPlans,
          videoLinks: [...prev.mediaAndPlans.videoLinks, newVideoLink.trim()]
        }
      }));
      setNewVideoLink('');
    }
  };
  
  const handleRemoveVideoLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaAndPlans: {
        ...prev.mediaAndPlans,
        videoLinks: prev.mediaAndPlans.videoLinks.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleProjectLayoutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        mediaAndPlans: {
          ...prev.mediaAndPlans,
          projectLayoutsImage: [...prev.mediaAndPlans.projectLayoutsImage, ...Array.from(files)]
        }
      }));
    }
  };
  
  const handleFloorLayoutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        mediaAndPlans: {
          ...prev.mediaAndPlans,
          floorLayoutsImage: [...prev.mediaAndPlans.floorLayoutsImage, ...Array.from(files)]
        }
      }));
    }
  };
  
  const handleUnitPlanLayoutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        mediaAndPlans: {
          ...prev.mediaAndPlans,
          unitPlanLayoutsImage: [...prev.mediaAndPlans.unitPlanLayoutsImage, ...Array.from(files)]
        }
      }));
    }
  };
  
  const handleRemoveProjectLayout = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaAndPlans: {
        ...prev.mediaAndPlans,
        projectLayoutsImage: prev.mediaAndPlans.projectLayoutsImage.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleRemoveFloorLayout = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaAndPlans: {
        ...prev.mediaAndPlans,
        floorLayoutsImage: prev.mediaAndPlans.floorLayoutsImage.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleRemoveUnitPlanLayout = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaAndPlans: {
        ...prev.mediaAndPlans,
        unitPlanLayoutsImage: prev.mediaAndPlans.unitPlanLayoutsImage.filter((_, i) => i !== index)
      }
    }));
  };

  // Add handlers
const handleLocationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setFormData(prev => ({
    ...prev,
    location: e.target.value
  }));
};

const handleOfferTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setFormData(prev => ({
    ...prev,
    paymentAndOffers: {
      ...prev.paymentAndOffers,
      offerText: e.target.value
    }
  }));
};

const handleOfferImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    setFormData(prev => ({
      ...prev,
      paymentAndOffers: {
        ...prev.paymentAndOffers,
        offerImages: [...prev.paymentAndOffers.offerImages, ...Array.from(files)]
      }
    }));
  }
};

const handleRemoveOfferImage = (index: number) => {
  setFormData(prev => ({
    ...prev,
    paymentAndOffers: {
      ...prev.paymentAndOffers,
      offerImages: prev.paymentAndOffers.offerImages.filter((_, i) => i !== index)
    }
  }));
};
  
const handleSpecificationImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    setFormData(prev => ({
      ...prev,
      specifications: {
        specificationImages: [...prev.specifications.specificationImages, ...Array.from(files)]
      }
    }));
  }
};

const handleRemoveSpecificationImage = (index: number) => {
  setFormData(prev => ({
    ...prev,
    specifications: {
      specificationImages: prev.specifications.specificationImages.filter((_, i) => i !== index)
    }
  }));
};

const addConfiguration = () => {
  setFormData(prev => ({
    ...prev,
    configuration: {
      ...prev.configuration,
      configurations: [
        ...prev.configuration.configurations,
        {
          bhkType: '',
          area: { value: null, unit: 'sq ft' },
          price: { value: null, unit: 'Cr' },
          bookingAmount: { value: null, unit: 'Lac' },
          parking: '',
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
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  index: number
) => {
  const { name, value } = e.target;
  
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    setFormData(prev => {
      const newConfigs = [...prev.configuration.configurations];
      newConfigs[index] = {
        ...newConfigs[index],
        [parent]: {
          ...newConfigs[index][parent as keyof typeof newConfigs[typeof index]],
          [child]: child === 'value' ? (value === '' ? null : Number(value)) : value
        }
      };
      return {
        ...prev,
        configuration: {
          ...prev.configuration,
          configurations: newConfigs
        }
      };
    });
  } else {
    setFormData(prev => {
      const newConfigs = [...prev.configuration.configurations];
      newConfigs[index] = {
        ...newConfigs[index],
        [name]: value
      };
      return {
        ...prev,
        configuration: {
          ...prev.configuration,
          configurations: newConfigs
        }
      };
    });
  }
};

const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    basicInfo: {
      ...prev.basicInfo,
      [name]: value
    }
  }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError('');
  setSubmitSuccess(false);

  try {
    const formPayload = new FormData();

    // Append files with exact field names from your route configuration
    formData.propertyImages.forEach(file => formPayload.append('propertyImages', file));
    formData.amenities.amenityImages.forEach(file => formPayload.append('amenityImages', file));
    formData.mediaAndPlans.unitPlanLayoutsImage.forEach(file => formPayload.append('unitPlanLayoutsImage', file));
    formData.mediaAndPlans.floorLayoutsImage.forEach(file => formPayload.append('floorLayoutsImage', file));
    formData.mediaAndPlans.projectLayoutsImage.forEach(file => formPayload.append('projectLayoutsImage', file));
    formData.paymentAndOffers.offerImages.forEach(file => formPayload.append('offerImages', file));
    formData.specifications.specificationImages.forEach(file => formPayload.append('specificationImages', file));

    // Append JSON data with proper structure
    formPayload.append('data', JSON.stringify({
      basicInfo: formData.basicInfo,
      configuration: formData.configuration,
      propertyDetails: formData.propertyDetails,
      possession: formData.possession,
      prosAndCons: formData.prosAndCons,
      amenities: {
        indoor: formData.amenities.indoor,
        outdoor: formData.amenities.outdoor
      },
      mediaAndPlans: {
        videoLinks: formData.mediaAndPlans.videoLinks
      },
      location: formData.location,
      paymentAndOffers: {
        offerText: formData.paymentAndOffers.offerText
      }
    }));

    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/createproperty`, {
      method: 'POST',
      body: formPayload, // Don't set Content-Type header - browser will handle it
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create property');
    }

    setSubmitSuccess(true);
    // Optional: Reset form after success
    // setFormData({ ...initialFormState });
  } catch (error) {
    console.error('Submission error:', error);
    setSubmitError(error instanceof Error ? error.message : 'Failed to create property');
  } finally {
    setIsSubmitting(false);
  }
};

  console.log(formData)

  return (

    

    
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>

      {/* Basic Info Section */}
<div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
  <div className="grid grid-cols-1 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Property Name</label>
      <input
        type="text"
        name="propertyName"
        value={formData.basicInfo.propertyName}
        onChange={handleBasicInfoChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
      />
    </div>
  </div>
</div>
      {/* //Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Configuration</h3>
  
  {formData.configuration.configurations.map((config, index) => (
    <div key={index} className="mb-6 border-b pb-6 last:border-b-0">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Configuration {index + 1}</h4>
        {formData.configuration.configurations.length > 1 && (
          <button
            type="button"
            onClick={() => removeConfiguration(index)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BHK Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">BHK Type</label>
          <select
            name="bhkType"
            value={config.bhkType}
            onChange={(e) => handleConfigChange(e, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select BHK Type</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={`${num} BHK`}>
                {num} BHK
              </option>
            ))}
          </select>
        </div>

        {/* Other fields (area, price, booking amount, parking) */}
        {/* Update each input's name and onChange handler similarly */}
        {/* Example for area: */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Area</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="area.value"
              value={config.area.value ?? ''}
              onChange={(e) => handleConfigChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="area.unit"
              value={config.area.unit}
              onChange={(e) => handleConfigChange(e, index)}
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

{/* Price */}
<div>
  <label className="block text-sm font-medium text-gray-700">Price</label>
  <div className="flex gap-2">
    <input
      type="number"
      name="price.value"
      value={config.price.value ?? ''}
      onChange={(e) => handleConfigChange(e, index)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
    <select
      name="price.unit"
      value={config.price.unit}
      onChange={(e) => handleConfigChange(e, index)}
      >
      <option value="Cr">Cr</option>
      <option value="Lac">Lac</option>
    </select>
  </div>
</div>

{/* Booking Amount */}
<div>
  <label className="block text-sm font-medium text-gray-700">Booking Amount</label>
  <div className="flex gap-2">
    <input
      type="number"
      name="bookingAmount.value"
      value={config.bookingAmount.value ?? ''}
      onChange={(e) => handleConfigChange(e, index)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
    <select
  name="bookingAmount.unit"
  value={config.bookingAmount.unit}
  onChange={(e) => handleConfigChange(e, index)}
  >
  <option value="Lac">Lac</option>
  <option value="Cr">Cr</option>
  </select>
  </div>
</div>

{/* Parking */}
<div>
  <label className="block text-sm font-medium text-gray-700">Parking</label>
  <select
    name="parking"
    value={config.parking}
    onChange={(e) => handleConfigChange(e, index)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  >
    <option value="">Select Parking</option>
    <option value="Available">Available</option>
    <option value="Not Available">Not Available</option>
    <option value="Limited">Limited</option>
  </select>
</div>
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addConfiguration}
    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
  >
    + Add Configuration
  </button>

  {/* Keep the existing googleMapLink, aboutProperty, and aboutBuilder fields */}
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Google Map Link</label>
    <input
      type="text"
      name="googleMapLink"
      value={formData.configuration.googleMapLink}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        configuration: {
          ...prev.configuration,
          googleMapLink: e.target.value
        }
      }))}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>

  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">About Property</label>
    <input
      type="text"
      name="aboutProperty"
      value={formData.configuration.aboutProperty}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        configuration: {
          ...prev.configuration,
          aboutProperty: e.target.value
        }
      }))}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>

  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">About Builder</label>
    <input
      type="text"
      name="aboutBuilder"
      value={formData.configuration.aboutBuilder}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        configuration: {
          ...prev.configuration,
          aboutBuilder: e.target.value
        }
      }))}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>

  {/* Similar changes for aboutProperty and aboutBuilder */}
</div>

      {/* Property Image */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Property Images</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.propertyImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PropertyDetails  */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Property Details</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Land Parcel</label>
      <div className="flex gap-2">
        <input
          type="number"
          name="landParcel.value"
          value={formData.propertyDetails.landParcel.value ?? ''}
          onChange={handlePropertyDetailsChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          min="0"
          step="0.01"
        />
        <input
          type="text"
          name="landParcel.unit"
          value={formData.propertyDetails.landParcel.unit ?? ''}
          onChange={handlePropertyDetailsChange}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Total Towers</label>
      <input
        type="number"
        name="totalTowers"
        value={formData.propertyDetails.totalTowers}
        onChange={handlePropertyDetailsChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        min="0"
        step="0.01"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">Building Structures</label>
      <textarea
        name="buildingStructures"
        value={formData.propertyDetails.buildingStructures}
        onChange={handlePropertyDetailsChange}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Describe the building structures..."
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Available Towers</label>
      <input
        type="number"
        name="availableTowers"
        value={formData.propertyDetails.availableTowers}
        onChange={handlePropertyDetailsChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        min="0"
        step="0.01"
      />
    </div>
  </div>
      </div>

      {/* Pros and Cons  */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Pros and Cons</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Pros Section */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Pros</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPro}
          onChange={(e) => setNewPro(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Add a pro"
        />
        <button
          onClick={handleAddPro}
          className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {formData.prosAndCons.pros.map((pro, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span>{pro}</span>
            <button
              onClick={() => handleRemovePro(index)}
              className="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Cons Section */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Cons</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCon}
          onChange={(e) => setNewCon(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Add a con"
        />
        <button
          onClick={handleAddCon}
          className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {formData.prosAndCons.cons.map((con, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span>{con}</span>
            <button
              onClick={() => handleRemoveCon(index)}
              className="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
      </div>

      {/* All Amenities  */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Indoor Amenities */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Indoor Amenities</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newIndoorAmenity}
          onChange={(e) => setNewIndoorAmenity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Add indoor amenity"
        />
        <button
          onClick={handleAddIndoorAmenity}
          className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {formData.amenities.indoor.map((amenity, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span>{amenity}</span>
            <button
              onClick={() => handleRemoveIndoorAmenity(index)}
              className="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Outdoor Amenities */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Outdoor Amenities</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newOutdoorAmenity}
          onChange={(e) => setNewOutdoorAmenity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Add outdoor amenity"
        />
        <button
          onClick={handleAddOutdoorAmenity}
          className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {formData.amenities.outdoor.map((amenity, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span>{amenity}</span>
            <button
              onClick={() => handleRemoveOutdoorAmenity(index)}
              className="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Amenity Images */}
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Amenity Images</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleAmenityImagesUpload}
      className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100"
    />
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {formData.amenities.amenityImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(image)}
            alt={`Amenity ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => handleRemoveAmenityImage(index)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

     {/* Media and Plans  */}

     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Media and Plans</h3>

  {/* Video Links Section */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">Video Links</label>
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={newVideoLink}
        onChange={(e) => setNewVideoLink(e.target.value)}
        placeholder="Add video link"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <button
        onClick={handleAddVideoLink}
        className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
    <ul className="space-y-2">
      {formData.mediaAndPlans.videoLinks.map((link, index) => (
        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
          <span className="truncate">{link}</span>
          <button
            onClick={() => handleRemoveVideoLink(index)}
            className="text-red-600 hover:text-red-800 ml-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  </div>

  {/* Image Sections */}
  <div className="space-y-6">
    {/* Project Layouts */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Project Layout Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleProjectLayoutUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {formData.mediaAndPlans.projectLayoutsImage.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(image)}
              alt={`Project Layout ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemoveProjectLayout(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Floor Layouts */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Floor Layout Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFloorLayoutUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {formData.mediaAndPlans.floorLayoutsImage.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(image)}
              alt={`Floor Layout ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemoveFloorLayout(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Unit Plan Layouts */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Unit Plan Layout Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUnitPlanLayoutUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {formData.mediaAndPlans.unitPlanLayoutsImage.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(image)}
              alt={`Unit Plan Layout ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemoveUnitPlanLayout(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Location and Offers  */}

  </div>
</div>

        {/* Location*/}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 className="text-xl font-semibold mb-4">Location</h3>
    <div>
      <textarea
        value={formData.location}
        onChange={handleLocationChange}
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Enter property location details..."
      />
    </div>
  </div>

  {/* Offers Section */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 className="text-xl font-semibold mb-4">Payment and Offers</h3>
    
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Offer Details</label>
        <textarea
          value={formData.paymentAndOffers.offerText}
          onChange={handleOfferTextChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter offer details..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Offer Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleOfferImagesUpload}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {formData.paymentAndOffers.offerImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Offer ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveOfferImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* specifications Section */}

  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
  
  <div>
    <label className="block text-sm font-medium text-gray-700">Specification Images</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleSpecificationImagesUpload}
      className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100"
    />
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {formData.specifications.specificationImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(image)}
            alt={`Specification ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => handleRemoveSpecificationImage(index)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Submit button   */}

      <div className="mt-8 space-y-4">
  <button
    type="button" // Changed to button to prevent default form submission
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        Submitting...
      </span>
    ) : (
      'Create Property'
    )}
  </button>

  {submitSuccess && (
    <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
      <p className="font-semibold">✓ Property created successfully!</p>
      <p className="mt-2 text-sm">The property has been added to the database.</p>
    </div>
  )}

  {submitError && (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
      <p className="font-semibold">⚠️ Submission Error</p>
      <p className="mt-2 text-sm">{submitError}</p>
    </div>
  )}
</div>


    </div>
  );
}