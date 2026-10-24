import type { IIngredient } from './types';
import dragonTearsIcon from '../assets/images/dragon-tears.png';
import fairyDustIcon from '../assets/images/fairy-dust.png';
import frostLotusIcon from '../assets/images/frost-lotus.png';
import mandrakeRootIcon from '../assets/images/mandrake-root.png';
import causticAcidIcon from '../assets/images/caustic-acid.png';
import essenceOfTheVoidIcon from '../assets/images/essence-of-the-void.png';
import phoenixFeatherIcon from '../assets/images/phoenix-feather.png';
import toadSlimeIcon from '../assets/images/toad-slime.png';

export const INGREDIENTS: IIngredient[] = [
  {
    id: 'dragon-tears',
    name: 'Dragon Tears',
    icon: dragonTearsIcon,
    temperature: 25,
    density: 8,
    magicPower: 10,
    description: 'Tears of an ancient dragon, filled with fiery magic.',
  },
  {
    id: 'fairy-dust',
    name: 'Fairy Dust',
    icon: fairyDustIcon,
    temperature: 12,
    density: 9,
    magicPower: 12,
    description: 'Enchanted dust that sparkles with a gentle magical glow.',
  },
  {
    id: 'frost-lotus',
    name: 'Frost Lotus',
    icon: frostLotusIcon,
    temperature: -18,
    density: 4,
    magicPower: 14,
    description: 'A rare flower that stores the cold of an eternal winter.',
  },
  {
    id: 'mandrake-root',
    name: 'Mandrake Root',
    icon: mandrakeRootIcon,
    temperature: -5,
    density: 20,
    magicPower: 8,
    description: 'An ancient root known for its strong connection to nature.',
  },
  {
    id: 'caustic-acid',
    name: 'Caustic Acid',
    icon: causticAcidIcon,
    temperature: 10,
    density: 14,
    magicPower: 22,
    description: 'A highly reactive substance with unpredictable magical properties.',
  },
  {
    id: 'essence-of-the-void',
    name: 'Essence of the Void',
    icon: essenceOfTheVoidIcon,
    temperature: -20,
    density: -10,
    magicPower: 40,
    description: 'A mysterious essence drawn from the depths of the void.',
  },
  {
    id: 'phoenix-feather',
    name: 'Phoenix Feather',
    icon: phoenixFeatherIcon,
    temperature: 50,
    density: -10,
    magicPower: 30,
    description: 'A feather infused with the power of fire and rebirth.',
  },
  {
    id: 'toad-slime',
    name: 'Toad Slime',
    icon: toadSlimeIcon,
    temperature: 5,
    density: 30,
    magicPower: 0,
    description: 'A sticky substance often used to stabilize magical mixtures.',
  },
];
