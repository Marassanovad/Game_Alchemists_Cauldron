import './styles/style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
    throw new Error('App root element #app was not found');
}

app.innerHTML = `
  <main class="game">
    <h1>Alchemist's Cauldron</h1>
    <p class="game__description">
      Combine ingredients, discover reactions, and brew potions.
    </p>

    <section class="cauldron" aria-label="Alchemy game area">
      <p>Your alchemy adventure starts here.</p>
    </section>
  </main>
`;
