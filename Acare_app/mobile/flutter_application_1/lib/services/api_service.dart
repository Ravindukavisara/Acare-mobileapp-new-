import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String _baseUrl = "http://localhost:3000";

  // Fetch predefined alerts from the backend
  Future<List<String>> getPredefinedAlerts() async {
    final url = Uri.parse('$_baseUrl/predefinedAlerts');
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return data.map((alert) => alert['alertMessage'] as String).toList();
      } else {
        throw Exception("Failed to load predefined alerts");
      }
    } catch (error) {
      print("Error fetching predefined alerts: $error");
      return [];
    }
  }

  // Send selected alert to the backend
  Future<void> sendEmergencyAlert(String alertMessage) async {
    final url = Uri.parse('$_baseUrl/sendAlert');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'alertMessage': alertMessage}),
      );

      if (response.statusCode == 200) {
        print("Alert sent successfully");
      } else {
        print("Failed to send alert: ${response.statusCode}");
      }
    } catch (error) {
      print("Error sending alert: $error");
    }
  }
}

Future<void> sendEmergencyAlert(String alertMessage) async {
  final url = Uri.parse('http://localhost:3000/sendAlert'); // Mobile backend
  try {
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'alertMessage': alertMessage}),
    );

    if (response.statusCode == 200) {
      print("Alert sent successfully");
    } else {
      print("Failed to send alert: ${response.statusCode}");
    }
  } catch (error) {
    print("Error sending alert: $error");
  }
}
