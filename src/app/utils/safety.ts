export interface SafetyPlace {
    id: string;
    name: string;
    type: 'Police' | 'Shelter' | 'NGO';
    address: string;
    distance: string;
    phone: string;
    lat: number;
    lng: number;
}

export const getNearbySafetyPlaces = (lat: number, lng: number): SafetyPlace[] => {
    // Mock data centered around the provided location
    return [
        {
            id: '1',
            name: 'City Police Station (HQ)',
            type: 'Police',
            address: '42 Central Ave, Downtown',
            distance: '0.8 km',
            phone: '100 / 011-23456789',
            lat: lat + 0.005,
            lng: lng + 0.003,
        },
        {
            id: '2',
            name: 'Safe Haven Women\'s Shelter',
            type: 'Shelter',
            address: '15 Peace St, West Side',
            distance: '1.2 km',
            phone: '1800-11-2233',
            lat: lat - 0.004,
            lng: lng + 0.006,
        },
        {
            id: '3',
            name: 'Empower Girls NGO',
            type: 'NGO',
            address: 'Building 7, Sector 4',
            distance: '2.5 km',
            phone: '011-98765432',
            lat: lat + 0.008,
            lng: lng - 0.002,
        },
        {
            id: '4',
            name: 'Regional Women\'s Protection Cell',
            type: 'Police',
            address: '88 Justice Road',
            distance: '3.1 km',
            phone: '1091 (Women Helpline)',
            lat: lat - 0.002,
            lng: lng - 0.005,
        },
        {
            id: '5',
            name: 'Community Care Center',
            type: 'Shelter',
            address: '102 Hope Lane',
            distance: '4.0 km',
            phone: '011-44556677',
            lat: lat + 0.010,
            lng: lng + 0.010,
        }
    ];
};
