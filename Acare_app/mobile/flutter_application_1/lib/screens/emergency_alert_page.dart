import 'package:flutter/material.dart';
import '../services/api_service.dart';

class EmergencyAlertPage extends StatefulWidget {
  const EmergencyAlertPage({Key? key}) : super(key: key);

  @override
  _EmergencyAlertPageState createState() => _EmergencyAlertPageState();
}

class _EmergencyAlertPageState extends State<EmergencyAlertPage> {
  final ApiService _apiService = ApiService();
  List<String> _alerts = [];
  String? _selectedAlert;

  @override
  void initState() {
    super.initState();
    _loadPredefinedAlerts();
  }

  // Load predefined alerts from the backend
  void _loadPredefinedAlerts() async {
    List<String> alerts = await _apiService.getPredefinedAlerts();
    setState(() {
      _alerts = alerts;
    });
  }

  void _sendAlert() {
    if (_selectedAlert != null) {
      _apiService.sendEmergencyAlert(_selectedAlert!);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Alert sent: $_selectedAlert')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please select an alert to send.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Emergency Alert'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Select an Emergency Alert',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              if (_alerts.isNotEmpty)
                DropdownButton<String>(
                  hint: Text("Choose an alert"),
                  value: _selectedAlert,
                  items: _alerts.map((alert) {
                    return DropdownMenuItem(
                      value: alert,
                      child: Text(alert),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedAlert = value;
                    });
                  },
                ),
              if (_alerts.isEmpty) CircularProgressIndicator(),
              SizedBox(height: 40),
              ElevatedButton(
                onPressed: _sendAlert,
                child: Text('Send Alert'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
