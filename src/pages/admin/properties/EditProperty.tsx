import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
     PriceRange, Configuration, PricingDetail, FAQ, Property 
    } from '../types/property'; // Assuming you have types defined
import { useParams } from 'react-router-dom';


const EditProperty: React.FC = () => {
    let {id} = useParams();
    const [formData, setFormData] = useState<Property | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        
        const fetchProperty = async () => {
            try {
                const response = await axios.get<{ property: Property }>(`http://localhost:3000/properties/getProperty/${id}`);
                setFormData(response.data.property);
            } catch (err) {
                setError('Failed to fetch property details');
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);


  

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return; // Guard clause
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing formData
      [name]: value
    });
  };

  // Handle nested object changes
  const handleNestedChange = (parent: keyof Property, field: string, value: any) => {
    if (!formData) return; // Guard clause
    setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent] as any),
          [field]: value
        }
      } as Property);
  };

  // Handle array changes
  const handleArrayChange = (parent: keyof Property, field: 'pros' | 'cons', index: number, value: string) => {
      if (!formData) return;
      const updatedData: Property = {
          ...formData,
          prosAndCons: {
              ...formData.prosAndCons,
              [field]: formData.prosAndCons[field].map((item, i) => i === index ? value : item)
          }
      };
      setFormData(updatedData);
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    if (!formData) return; // Guard clause
    const updatedData: Property = {
        ...formData,
        images: formData.images.filter((_, i) => i !== index)
      };
      
      setFormData(updatedData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        setLoading(true);
      const response = await axios.put(`http://localhost:3000/admin/editProperty/${id}`, formData);
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        console.log('Property updated successfully');
      }
    } catch (err) {
      setError('Failed to update property');
      console.error('Failed to update property:', err);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>Loading...</div>;
    }

  return (

    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      {success && <div className="text-green-500 mb-4">Property updated successfully</div>}

      {/* Basic Information */}
      <div className="mb-4">
        <label className="block mb-2">Property Name</label>
        <input
          type="text"
          name="name"
          value={formData?.name || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Location</h3>
        <input
          type="text"
          value={formData?.location.address || ""}
          onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={formData?.location.googleMapLink}
          onChange={(e) => handleNestedChange('location', 'googleMapLink', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Images */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Images</h3>
        <div className="grid grid-cols-3 gap-4">
          {formData?.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Property ${index + 1}`} className="w-full h-48 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

        {/* Possession */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Possession</h3>
            <input
            type="text"
            value={formData?.possession.target || ""}
            onChange={(e) => handleNestedChange('possession', 'target', e.target.value)}
            className="w-full p-2 border rounded mb-2"
            />
            <input
            type="text"
            value={formData?.possession.reraPossession}
            onChange={(e) => handleNestedChange('possession', 'reraPossession', e.target.value)}
            className="w-full p-2 border rounded"
            />

        </div>

        {/* Pros and Cons */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Pros and Cons</h3>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="font-bold">Pros</h4>
                <ul>
                {formData?.prosAndCons.pros.map((pro, index) => (
                    <li key={index}>
                    <input
                        type="text"
                        value={pro}
                        onChange={(e) => handleArrayChange('prosAndCons', 'pros', index, e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h4 className="font-bold">Cons</h4>
                <ul>
                {formData?.prosAndCons.cons.map((con, index) => (
                    <li key={index}>
                    <input
                        type="text"
                        value={con}
                        onChange={(e) => handleArrayChange('prosAndCons', 'cons', index, e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>

        {/* PriceRange */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Price Range</h3>
            {formData?.priceRange.map((priceRange, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
                <input
                type="text"
                value={priceRange.bhk}
                onChange={(e) => handleArrayChange('priceRange', 'bhk', index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                />
                <input
                type="number"
                value={priceRange.price}
                onChange={(e) => handleArrayChange('priceRange', 'price', index, parseInt(e.target.value, 10))}
                className="w-full p-2 border rounded"
                />
            </div>
            ))}
        </div>


        {/* Rera Numbers */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Rera Numbers</h3>
            {formData?.reraNumbers.map((reraNumber, index) => (
            <input
                key={index}
                type="text"
                value={reraNumber}
                onChange={(e) => handleArrayChange('reraNumbers', 'reraNumbers', index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            ))}
        </div>

        {/* Amenities */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Internal Amenities</h3>
            <ul>
            {formData?.internalAmenities.map((amenity, index) => (
            <li key={index}>
            <input
                type="text"
                value={amenity}
                onChange={(e) => handleArrayChange('internalAmenities', 'internalAmenities', index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            </li>
            ))}
            </ul>
        </div>
        <div className="mb-4">
            <h3 className="font-bold mb-2">Internal Amenities</h3>
            <ul>
            {formData?.externalAmenities.map((amenity, index) => (
            <li key={index}>
            <input
                type="text"
                value={amenity}
                onChange={(e) => handleArrayChange('externalAmenities', 'externalAmenities', index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            </li>
            ))}
            </ul>
        </div>

        {/* Master Plan Image */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Master Plan Image</h3>
            {formData?.masterPlanImage && (
                <div className="relative">
                    <img 
                        src={formData.masterPlanImage} 
                        alt="Master Plan" 
                        className="w-full h-48 object-cover rounded" 
                    />
                    <button
                        type="button"
                        onClick={() => handleNestedChange('masterPlanImage', '', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>

        {/* Floor Plan Image */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Floor Plan Image</h3>
            {formData?.floorPlanImage && (
                <div className="relative">
                    <img 
                        src={formData.floorPlanImage} 
                        alt="Floor Plan" 
                        className="w-full h-48 object-cover rounded" 
                    />
                    <button
                        type="button"
                        onClick={() => handleNestedChange('floorPlanImage', '', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>

        {/* Pricing Details and Unit Plans */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Pricing Details & Unit Plans</h3>
            {formData?.pricingDetails.map((detail, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                    <label className="block mb-2">Carpet Area
                        <input
                            type="number"
                            value={detail.carpetArea}
                            onChange={(e) => handleNestedChange('pricingDetails', `${index}.carpetArea`, Number(e.target.value))}
                            placeholder="Carpet Area"
                            className="w-full p-2 border rounded"
                        />
                        </label>
                        <label className="block mb-2">Total Price
                        <input
                            type="number"
                            value={detail.totalPrice}
                            onChange={(e) => handleNestedChange('pricingDetails', `${index}.totalPrice`, Number(e.target.value))}
                            placeholder="Total Price"
                            className="w-full p-2 border rounded"
                        />
                        </label>
                        <label className="block mb-2">Down Payment
                        <input
                            type="number"
                            value={detail.downPayment}
                            onChange={(e) => handleNestedChange('pricingDetails', `${index}.downPayment`, Number(e.target.value))}
                            placeholder="Down Payment"
                            className="w-full p-2 border rounded"
                        />
                        </label>
                        <label className="block mb-2">Parking spots
                        <input
                            type="number"
                            value={detail.parking}
                            onChange={(e) => handleNestedChange('pricingDetails', `${index}.parking`, Number(e.target.value))}
                            placeholder="Parking"
                            className="w-full p-2 border rounded"
                        />
                        </label>
                    </div>
                </div>
            ))}
        </div>

        {/* FAQ */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">FAQ</h3>
            {formData?.faqs.map((faq, index) => (
            <div key={faq._id} className="border p-4 mb-4 rounded">
                <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="block mb-2">Question
                <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleArrayChange('faqs', 'question', index, e.target.value)}
                    placeholder="Question"
                    className="w-full p-2 border rounded"
                />
                </label>
                <label className="block mb-2">Answer
                <input
                    type="text"
                    value={faq.answer}
                    onChange={(e) => handleArrayChange('faqs', 'answer', index, e.target.value)}
                    placeholder="Answer"
                    className="w-full p-2 border rounded"
                />
                </label>
                </div>
            </div>
            ))}
        </div>
        {/* Add FAQ Button */}
        <div className="mb-4">
            <button
                type="button"
                onClick={() => {
                    if (!formData) return;
                    setFormData({
                        ...formData,
                        faqs: [...formData.faqs, { _id: Date.now().toString(), question: '', answer: '' }]
                    });
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Add New FAQ
            </button>


            {/* Remove FAQ Button */}
            <button
                type="button"
                onClick={() => {
                    if (!formData) return;
                    const updatedFaqs = formData.faqs.filter((_, i) => i !== formData.faqs.length - 1);
                    setFormData({
                        ...formData,
                        faqs: updatedFaqs
                    });
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
            >
                Remove Last FAQ
            </button>
        </div>


        {/* Offer */}
        <div className="mb-4">
            <h3 className="font-bold mb-2">Offer</h3>
            <input
                type="text"
                name="offer"
                value={formData?.offer || ''}
                onChange={handleInputChange}
                placeholder="Enter offer details"
                className="w-full p-2 border rounded"
            />
        </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Updating...' : 'Update Property'}
      </button>
    </form>
  );
};

export default EditProperty;