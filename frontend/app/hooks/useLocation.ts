// app/hooks/useLocation.ts
import { useState, useEffect } from 'react';

interface LocationState {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  error: string | null;
  loading: boolean;
  permissionState: PermissionState | null;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    coords: null,
    error: null,
    loading: false,
    permissionState: null
  });

  useEffect(() => {
    // Check permission on component mount
    const checkPermission = async () => {
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          setState(prev => ({ ...prev, permissionState: permission.state }));
        } catch (error) {
          console.error('Error checking geolocation permission:', error);
        }
      }
    };
    
    checkPermission();
  }, []);

  // Function to get current location
  const getLocation = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });
      
      setState({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        error: null,
        loading: false,
        permissionState: 'granted'
      });
      
      return position.coords;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        loading: false,
        permissionState: 'denied'
      }));
      throw error;
    }
  };

  return {
    ...state,
    getLocation
  };
}