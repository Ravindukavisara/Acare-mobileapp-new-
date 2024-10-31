// mobile-app/lib/screens/JourneyScreen.dart
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import '../services/socket_service.dart';

class JourneyScreen extends StatefulWidget {
  @override
  _JourneyScreenState createState() => _JourneyScreenState();
}

class _JourneyScreenState extends State<JourneyScreen> {
  GoogleMapController? mapController;
  LatLng? destination;
  LocationData? currentLocation;
  Location location = Location();
  Set<Polyline> polylines = {};

  @override
  void initState() {
    super.initState();
    setupSocket();
    startTracking();
    location.onLocationChanged.listen((LocationData locationData) {
      setState(() {
        currentLocation = locationData;
      });
      _updatePolyline();
    });
  }

  void setupSocket() {
    listenForDestination((location) {
      setState(() {
        destination = LatLng(location['lat'], location['lng']);
      });
      _updatePolyline();
    });
  }

  void startTracking() {
    startLocationTracking('driver123');
  }

  void _updatePolyline() {
    if (currentLocation != null && destination != null) {
      final LatLng currentLatLng = LatLng(
        currentLocation!.latitude!,
        currentLocation!.longitude!,
      );

      final polyline = Polyline(
        polylineId: PolylineId("route"),
        points: [currentLatLng, destination!],
        color: Colors.blue,
        width: 5,
      );

      setState(() {
        polylines = {polyline};
      });
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Live Journey')),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: currentLocation != null
              ? LatLng(currentLocation!.latitude!, currentLocation!.longitude!)
              : LatLng(0, 0),
          zoom: 15,
        ),
        markers: {
          if (currentLocation != null)
            Marker(
              markerId: MarkerId("currentLocation"),
              position: LatLng(
                  currentLocation!.latitude!, currentLocation!.longitude!),
            ),
          if (destination != null)
            Marker(
              markerId: MarkerId("destination"),
              position: destination!,
            ),
        },
        polylines: polylines,
      ),
    );
  }
}
