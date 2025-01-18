import React, { useState, ChangeEvent } from 'react';
import { Plus, Minus, Upload, X } from 'lucide-react';

interface FormData {
  name: string;
  priceRange: Array<{ bhk: string; price: number }>;
  location: {
    address: string;
    googleMapLink: string;
    locality: string;
  };
  images: File[];
  imageUrls: string[]; // For preview
  landParcel: number;
  towers: number;
  configurations: Array<{ bhk: string; carpetArea: number }>;
  reraNumbers: string[];
  possession: {
    target: string;
    reraPossession: string;
  };
  about: string;
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  videoLink: string;
  internalAmenities: string[];
  externalAmenities: string[];
  masterPlanImage: File | null;
  floorPlanImage: File | null;
  pricingDetails: Array<{
    carpetArea: number;
    totalPrice: number;
    downPayment: number;
    parking: number;
    unitPlanImage: string;
  }>;
  paymentScheme: string;
  offer: string;
  faqs: Array<{ question: string; answer: string }>;
}

export default function NewProperty() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    priceRange: [{ bhk: '', price: 0 }],
    location: { address: '', googleMapLink: '', locality: '' },
    images: [],
    imageUrls: [],
    landParcel: 0,
    towers: 0,
    configurations: [{ bhk: '', carpetArea: 0 }],
    reraNumbers: [''],
    possession: { target: '', reraPossession: '' },
    about: '',
    prosAndCons: { pros: [''], cons: [''] },
    videoLink: '',
    internalAmenities: [''],
    externalAmenities: [''],
    masterPlanImage: null,
    floorPlanImage: null,
    pricingDetails: [{
      carpetArea: 0,
      totalPrice: 0,
      downPayment: 0,
      parking: 0,
      unitPlanImage: ''
    }],
    paymentScheme: '',
    offer: '',
    faqs: [{ question: '', answer: '' }]
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      const newImageUrls = newImages.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
        imageUrls: [...prev.imageUrls, ...newImageUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
  const formDataToSend = new FormData();
  
  // Append images
  formData.images.forEach((image: File) => {
    formDataToSend.append('images', image);
  });
  
  // Append master plan image
  if (formData.masterPlanImage) {
    formDataToSend.append('masterPlanImage', formData.masterPlanImage);
  }
  
  // Append floor plan image
  if (formData.floorPlanImage) {
    formDataToSend.append('floorPlanImage', formData.floorPlanImage);
  }
  
  // Append the rest of the form data as JSON
  formDataToSend.append('data', JSON.stringify({
    ...formData,
    images: undefined, // Remove images from JSON data
    masterPlanImage: undefined,
    floorPlanImage: undefined
  }));

  try {
    const response = await fetch('http://localhost:3000/admin/createproperty', {
      method: 'POST',
      body: formDataToSend
    });
    
    console.log(response)
    if (response.ok) {
      // Handle success
    }
  } catch (error) {
    // Handle error
  }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
            <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Basic Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
              type="text"
              placeholder="Property Name"
              className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
              />
              <input
              type="text"
              placeholder="Address"
              className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
              value={formData.location.address}
              onChange={e => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
              required
              />
              <input
              type="text"
              placeholder="Locality"
              className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
              value={formData.location.locality}
              onChange={e => setFormData({...formData, location: {...formData.location, locality: e.target.value}})}
              />
            </div>
            </div>

          {/* Images Upload */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Property Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="images"
              />
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Click to upload multiple images</span>
              </label>
            </div>

            {/* Image Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>



          {/* Price Range & Configurations */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Price Range & Configurations</h2>
  
  {formData.priceRange.map((range, index) => (
    <div key={index} className="flex space-x-4">
      <select
        value={range.bhk}
        onChange={(e) => {
          const newPriceRange = [...formData.priceRange];
          newPriceRange[index].bhk = e.target.value;
          setFormData({...formData, priceRange: newPriceRange});
        }}
        className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      >
        <option value="">Select BHK</option>
        <option value="1 BHK">1 BHK</option>
        <option value="2 BHK">2 BHK</option>
        <option value="3 BHK">3 BHK</option>
        <option value="4 BHK">4 BHK</option>
      </select>
      <input
        type="number"
        placeholder="Price (in Cr)"
        value={range.price}
        onChange={(e) => {
          const newPriceRange = [...formData.priceRange];
          newPriceRange[index].price = parseFloat(e.target.value);
          setFormData({...formData, priceRange: newPriceRange});
        }}
        className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      />
      <button
        type="button"
        onClick={() => {
          const newPriceRange = formData.priceRange.filter((_, i) => i !== index);
          setFormData({...formData, priceRange: newPriceRange});
        }}
        className="p-2 text-red-600 hover:text-red-800"
      >
        <Minus className="h-5 w-5" />
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => setFormData({
      ...formData,
      priceRange: [...formData.priceRange, { bhk: '', price: 0 }]
    })}
    className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
  >
    <Plus className="h-5 w-5" />
    <span>Add Price Range</span>
  </button>
</div>

{/* Property Details */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="number"
      placeholder="Land Parcel (in acres)"
      value={formData.landParcel}
      onChange={(e) => setFormData({...formData, landParcel: e.target.value})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
    />
    <input
      type="number"
      placeholder="Number of Towers"
      value={formData.towers}
      onChange={(e) => setFormData({...formData, towers: parseInt(e.target.value)})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
    />
  </div>
  
  {/* RERA Numbers */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">RERA Numbers</label>
    {formData.reraNumbers.map((rera, index) => (
      <div key={index} className="flex space-x-2">
        <input
          type="text"
          value={rera}
          onChange={(e) => {
            const newRera = [...formData.reraNumbers];
            newRera[index] = e.target.value;
            setFormData({...formData, reraNumbers: newRera});
          }}
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
        <button
          type="button"
          onClick={() => {
            const newRera = formData.reraNumbers.filter((_, i) => i !== index);
            setFormData({...formData, reraNumbers: newRera});
          }}
          className="p-2 text-red-600 hover:text-red-800"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => setFormData({...formData, reraNumbers: [...formData.reraNumbers, '']})}
      className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
    >
      <Plus className="h-5 w-5" />
      <span>Add RERA Number</span>
    </button>
  </div>
</div>

{/* Possession & About */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Possession & Description</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Possession Target"
      value={formData.possession.target}
      onChange={(e) => setFormData({...formData, possession: {...formData.possession, target: e.target.value}})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      required
    />
    <input
      type="text"
      placeholder="RERA Possession Date"
      value={formData.possession.reraPossession}
      onChange={(e) => setFormData({...formData, possession: {...formData.possession, reraPossession: e.target.value}})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
    />
  </div>
  <textarea
    placeholder="About the Property"
    value={formData.about}
    onChange={(e) => setFormData({...formData, about: e.target.value})}
    className="w-full border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
    rows={4}
  />
</div>

    {/* Pros & Cons */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Pros & Cons</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Pros */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Pros</label>
      {formData.prosAndCons.pros.map((pro, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={pro}
            onChange={(e) => {
              const newPros = [...formData.prosAndCons.pros];
              newPros[index] = e.target.value;
              setFormData({...formData, prosAndCons: {...formData.prosAndCons, pros: newPros}});
            }}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
          />
          <button
            type="button"
            onClick={() => {
              const newPros = formData.prosAndCons.pros.filter((_, i) => i !== index);
              setFormData({...formData, prosAndCons: {...formData.prosAndCons, pros: newPros}});
            }}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormData({
          ...formData,
          prosAndCons: {...formData.prosAndCons, pros: [...formData.prosAndCons.pros, '']}
        })}
        className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
      >
        <Plus className="h-5 w-5" />
        <span>Add Pro</span>
      </button>
    </div>

    {/* Cons */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Cons</label>
      {formData.prosAndCons.cons.map((con, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={con}
            onChange={(e) => {
              const newCons = [...formData.prosAndCons.cons];
              newCons[index] = e.target.value;
              setFormData({...formData, prosAndCons: {...formData.prosAndCons, cons: newCons}});
            }}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
          />
          <button
            type="button"
            onClick={() => {
              const newCons = formData.prosAndCons.cons.filter((_, i) => i !== index);
              setFormData({...formData, prosAndCons: {...formData.prosAndCons, cons: newCons}});
            }}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormData({
          ...formData,
          prosAndCons: {...formData.prosAndCons, cons: [...formData.prosAndCons.cons, '']}
        })}
        className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
      >
        <Plus className="h-5 w-5" />
        <span>Add Con</span>
      </button>
    </div>
  </div>
</div>

{/* Amenities */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Internal Amenities */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Internal Amenities</label>
      {formData.internalAmenities.map((amenity, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={amenity}
            onChange={(e) => {
              const newAmenities = [...formData.internalAmenities];
              newAmenities[index] = e.target.value;
              setFormData({...formData, internalAmenities: newAmenities});
            }}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
          />
          <button
            type="button"
            onClick={() => {
              const newAmenities = formData.internalAmenities.filter((_, i) => i !== index);
              setFormData({...formData, internalAmenities: newAmenities});
            }}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormData({...formData, internalAmenities: [...formData.internalAmenities, '']})}
        className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
      >
        <Plus className="h-5 w-5" />
        <span>Add Internal Amenity</span>
      </button>
    </div>

    {/* External Amenities */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">External Amenities</label>
      {formData.externalAmenities.map((amenity, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={amenity}
            onChange={(e) => {
              const newAmenities = [...formData.externalAmenities];
              newAmenities[index] = e.target.value;
              setFormData({...formData, externalAmenities: newAmenities});
            }}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
          />
          <button
            type="button"
            onClick={() => {
              const newAmenities = formData.externalAmenities.filter((_, i) => i !== index);
              setFormData({...formData, externalAmenities: newAmenities});
            }}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormData({...formData, externalAmenities: [...formData.externalAmenities, '']})}
        className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
      >
        <Plus className="h-5 w-5" />
        <span>Add External Amenity</span>
      </button>
    </div>
  </div>
</div>



{/* Media Links & Plans */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Media & Plans</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Video Link"
      value={formData.videoLink}
      onChange={(e) => setFormData({...formData, videoLink: e.target.value})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
    />
    
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Master Plan Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFormData({...formData, masterPlanImage: e.target.files[0]});
          }
        }}
        className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Floor Plan Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFormData({...formData, floorPlanImage: e.target.files[0]});
          }
        }}
        className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      />
    </div>
  </div>
</div>

{/* Pricing Details */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Pricing & Unit Plans</h2>
  {formData.pricingDetails.map((detail, index) => (
    <div key={index} className="p-4 border rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Carpet Area (sq.ft)"
          // value={detail.carpetArea}
          onChange={(e) => {
            const newDetails = [...formData.pricingDetails];
            newDetails[index].carpetArea = parseInt(e.target.value);
            setFormData({...formData, pricingDetails: newDetails});
          }}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
        <input
          type="number"
          placeholder="Total Price"
          // value={detail.totalPrice}
          onChange={(e) => {
            const newDetails = [...formData.pricingDetails];
            newDetails[index].totalPrice = e.target.value;
            setFormData({...formData, pricingDetails: newDetails});
          }}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
        <input
          type="number"
          placeholder="Down Payment"
          // value={detail.downPayment}
          onChange={(e) => {
            const newDetails = [...formData.pricingDetails];
            newDetails[index].downPayment = parseInt(e.target.value);
            setFormData({...formData, pricingDetails: newDetails});
          }}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
        <input
          type="number"
          placeholder="Parking Unit"
          // value={detail.parking}
          onChange={(e) => {
            const newDetails = [...formData.pricingDetails];
            newDetails[index].parking = parseInt(e.target.value);
            setFormData({...formData, pricingDetails: newDetails});
          }}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          const newDetails = formData.pricingDetails.filter((_, i) => i !== index);
          setFormData({...formData, pricingDetails: newDetails});
        }}
        className="text-red-600 hover:text-red-800"
      >
        Remove Price Detail
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => setFormData({
      ...formData,
      pricingDetails: [...formData.pricingDetails, {
        carpetArea: 0,
        totalPrice: 0,
        downPayment: 0,
        parking: 0,
        unitPlanImage: ''
      }]
    })}
    className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
  >
    <Plus className="h-5 w-5" />
    <span>Add Price Detail</span>
  </button>
</div>




{/* Payment & Offer */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Payment & Offer Details</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <textarea
      placeholder="Payment Scheme"
      value={formData.paymentScheme}
      onChange={(e) => setFormData({...formData, paymentScheme: e.target.value})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      rows={3}
    />
    <textarea
      placeholder="Special Offer"
      value={formData.offer}
      onChange={(e) => setFormData({...formData, offer: e.target.value})}
      className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
      rows={3}
    />
  </div>
</div>

{/* FAQs */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
  
  {formData.faqs.map((faq, index) => (
    <div key={index} className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Question"
          value={faq.question}
          onChange={(e) => {
            const newFaqs = [...formData.faqs];
            newFaqs[index].question = e.target.value;
            setFormData({...formData, faqs: newFaqs});
          }}
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        />
        <button
          type="button"
          onClick={() => {
            const newFaqs = formData.faqs.filter((_, i) => i !== index);
            setFormData({...formData, faqs: newFaqs});
          }}
          className="p-2 text-red-600 hover:text-red-800"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>
      <textarea
        placeholder="Answer"
        value={faq.answer}
        onChange={(e) => {
          const newFaqs = [...formData.faqs];
          newFaqs[index].answer = e.target.value;
          setFormData({...formData, faqs: newFaqs});
        }}
        className="w-full border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        rows={2}
      />
    </div>
  ))}
  <button
    type="button"
    onClick={() => setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }]
    })}
    className="flex items-center space-x-2 text-maroon-600 hover:text-maroon-800"
  >
    <Plus className="h-5 w-5" />
    <span>Add FAQ</span>
  </button>
</div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-maroon-600 text-white px-6 py-2 rounded-lg hover:bg-maroon-700 transition-colors"
            >
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}