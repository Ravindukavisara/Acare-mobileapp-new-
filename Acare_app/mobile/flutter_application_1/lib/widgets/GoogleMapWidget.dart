// lib/widgets/GoogleMapWidget.dart
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class GoogleMapWidget extends StatelessWidget {
  final LatLng initialPosition;
  final Set<Marker> markers;

  const GoogleMapWidget({
    required this.initialPosition,
    required this.markers,
  });

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      const center = Center(child: Text('Google Maps not supported on web.'));
      return center;
    } else {
      return GoogleMap(
        initialCameraPosition:
            CameraPosition(target: initialPosition, zoom: 15),
        markers: markers,
      );
    }
  }
}
