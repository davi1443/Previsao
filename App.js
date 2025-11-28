import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, ScrollView, SafeAreaView, Platform } from 'react-native';

const weatherCodeMap = (code) => {
  switch (code) {
    case 0: return { description: 'Céu Limpo', emoji: '☀️' };
    case 1:
    case 2: return { description: 'Parcialmente Nublado', emoji: '🌤️' };
    case 3: return { description: 'Nublado', emoji: '☁️' };
    case 45:
    case 48: return { description: 'Névoa/Fumaça', emoji: '🌫️' };
    case 51:
    case 53:
    case 55: return { description: 'Chuvisco Leve', emoji: '🌧️' };
    case 56:
    case 57: return { description: 'Chuvisco Congelante', emoji: '🥶🌧️' };
    case 61:
    case 63:
    case 65: return { description: 'Chuva', emoji: '☔' };
    case 66:
    case 67: return { description: 'Chuva Congelante Forte', emoji: '🧊🌧️' };
    case 71:
    case 73:
    case 75: return { description: 'Nevasca', emoji: '🌨️' };
    case 77: return { description: 'Flocos de Neve', emoji: '❄️' };
    case 80:
    case 81:
    case 82: return { description: 'Pancadas de Chuva', emoji: '⛈️' };
    case 85:
    case 86: return { description: 'Neve Pesada', emoji: '❄️☃️' };
    case 95:
    case 96:
    case 99: return { description: 'Trovoada', emoji: '⚡' };
    default: return { description: 'Clima Indeterminado', emoji: '❓' };
  }
};

const API_GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const API_WEATHER = 'https://api.open-meteo.com/v1/forecast';

export default function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!cityInput.trim()) {
      setError('Digite o nome de uma cidade.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const geoUrl = `${API_GEO}?name=${encodeURIComponent(cityInput)}&count=1&language=pt&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoJson = await geoResponse.json();

      if (!geoJson.results || geoJson.results.length === 0) {
        setError(`Não foi possível encontrar as coordenadas para "${cityInput}".`);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name: cityName } = geoJson.results[0];


      const weatherUrl = `${API_WEATHER}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherJson = await weatherResponse.json();

      if (weatherJson.error) {
        setError(`Erro ao buscar o clima: ${weatherJson.reason}`);
        setLoading(false);
        return;
      }
      
      const { temperature_2m, weather_code } = weatherJson.current;
      const { description, emoji } = weatherCodeMap(weather_code);

      setWeatherData({
        city: cityName,
        temperature: temperature_2m,
        description: description,
        emoji: emoji,
        units: weatherJson.current_units.temperature_2m,
      });

    } catch (err) {
      console.error('Erro de API:', err);
      setError('Erro ao conectar com o serviço de clima.');
    } finally {
      setLoading(false);
    }
  };

  const WeatherCard = ({ data }) => (
    <View style={styles.card}>
      <Text style={styles.cityText}>{data.city}</Text>
      <Text style={styles.emojiText}>{data.emoji}</Text>
      <Text style={styles.tempText}>
        {data.temperature.toFixed(0)}{data.units}
      </Text>
      <Text style={styles.descriptionText}>{data.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Previsão do Tempo 🌤️</Text>
        
        {/* entrada para a cidade */}
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da cidade"
          placeholderTextColor="#999"
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={fetchWeather}
        />
        
        {/* Busca */}
        <View style={styles.buttonContainer}>
             <Button
                title={loading ? 'Buscando...' : 'Buscar Clima'}
                onPress={fetchWeather}
                color="#007AFF"
                disabled={loading}
              />
        </View>

        {/* Carregamento */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        )}

        {/* Erro */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>🚨 {error}</Text>
          </View>
        )}

        {/* Dados do Clima */}
        {weatherData && <WeatherCard data={weatherData} />}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  errorContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFE5E5',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cityText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emojiText: {
    fontSize: 80,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 64,
    fontWeight: '200',
    color: '#007AFF',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});