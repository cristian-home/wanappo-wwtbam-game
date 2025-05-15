import { createI18n } from 'vue-i18n'

// Define messages for each language
const messages = {
  en: {
    greeting: 'Hello!',
    // Add more English translations here
    timeLeft: 'Time Left:',
    loadingQuestion: 'Loading question...',
    moneyLadder: 'Prize Ladder',
    lifelines: 'Lifelines',
    gameLogoAlt: 'Game Logo',
    home: 'Home',
    playGame: 'Play Game',
    gameOverTest: 'Game Over (Test)',
    welcomeToYourApp: 'Welcome to Your Vue.js App',
    projectCreatedWith: "You've successfully created a project with {0} + {1}. What's next?",
    gameOver: 'Game Over',
    yourFinalScore: 'Your final score:',
    thankYouForPlaying: 'Thank you for playing!',
    playAgain: 'Play Again',
    backToHome: 'Back to Home',
    questionPanel: 'Question Panel',
    // Gameplay & buttons
    confirmAnswer: 'Confirm Answer',
    newGame: 'New Game',
    congratulations: 'Congratulations! You are a Millionaire!',
    youWon: 'You won:',
    // Lifelines
    fiftyFifty: '50:50',
    askAudience: 'Ask the Audience',
    used: 'Used {0}. This lifeline is now unavailable for the rest of the game.',
    incorrectRemoved: 'Two incorrect options will be removed.',
    audienceThinking: 'The audience is thinking... (Not implemented yet)',
    lifelineNotAvailable: 'Lifeline {0} not available or already used for this game.',
    lifelineUsageReminder:
      'Remember: used lifelines remain unavailable for all subsequent questions.',
    points: 'Points',
  },
  es: {
    greeting: '¡Hola!',
    // Add more Spanish translations here
    timeLeft: 'Tiempo Restante:',
    loadingQuestion: 'Cargando pregunta...',
    moneyLadder: 'Escalera de Premios',
    lifelines: 'Comodines',
    gameLogoAlt: 'Logo del Juego',
    home: 'Inicio',
    playGame: 'Jugar',
    gameOverTest: 'Fin del Juego (Prueba)',
    welcomeToYourApp: 'Bienvenido a Tu Aplicación Vue.js',
    projectCreatedWith: 'Has creado exitosamente un proyecto con {0} + {1}. ¿Qué sigue?',
    gameOver: 'Fin del Juego',
    yourFinalScore: 'Tu puntuación final:',
    thankYouForPlaying: '¡Gracias por jugar!',
    playAgain: 'Jugar de Nuevo',
    backToHome: 'Volver al Inicio',
    questionPanel: 'Panel de Preguntas',
    // Gameplay & buttons
    confirmAnswer: 'Confirmar Respuesta',
    newGame: 'Nuevo Juego',
    congratulations: '¡Felicidades! ¡Eres un Millonario!',
    youWon: 'Ganaste:',
    // Lifelines
    fiftyFifty: '50:50',
    askAudience: 'Pregunta al Público',
    used: 'Usado {0}. Este comodín ya no estará disponible para el resto del juego.',
    incorrectRemoved: 'Dos opciones incorrectas serán eliminadas.',
    audienceThinking: 'El público está pensando... (No implementado aún)',
    lifelineNotAvailable: 'El comodín {0} no está disponible o ya fue usado para este juego.',
    lifelineUsageReminder:
      'Recuerda: los comodines usados permanecerán no disponibles para todas las siguientes preguntas.',
    points: 'Puntos',
  },
}

const i18n = createI18n({
  legacy: false, // Important for Composition API
  locale: import.meta.env.VITE_I18N_LOCALE || 'es', // Default language
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en', // Fallback language
  messages, // Translations
  // something vue-i18n options here ...
})

export default i18n
