
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Property {
  _id: string;
  name: string;
  images: string[];
  location: {
    address: string;
  };
  priceRange: {
    bhk: string;
    price: number;
  }[];
  possession: {
    target: string;
  };
  configurations: {
    bhk: string;
  }[];
  // other fields
}

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Configurations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Possession
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {property.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.location.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.priceRange.map(p => `${p.bhk}: ₹${p.price}Cr`).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.configurations.map(c => `${c.bhk}`).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.possession.target}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <Link 
                      to={`/admin/editproperty/${property._id}`}
                      className="text-maroon-600 hover:text-maroon-900"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this property?')) {
                          try {
                            const response = await fetch(`http://0/admin/deleteproperty/${property._id}`, {
                              method: 'DELETE',
                            });
                            if (response.ok) {
                              // Refresh the page or update the UI
                              window.location.reload();
                            } else {
                              alert('Failed to delete property');
                            }
                          } catch (error) {
                            console.error('Error deleting property:', error);
                            alert('Error deleting property');
                          }
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}