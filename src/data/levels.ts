import { LevelData } from '../types';
import { colorQuestions, animalQuestions, fruitQuestions, flagQuestions } from './questions';

export const levels: LevelData[] = [
  {
    id: 1,
    name: 'Colors Challenge',
    description: 'Can you name all these colors correctly?',
    questions: colorQuestions,
    stars: 0,
    completed: false,
    unlocked: true
  },
  {
    id: 2,
    name: 'Animal Kingdom',
    description: 'Name these amazing animals!',
    questions: animalQuestions,
    stars: 0,
    completed: false,
    unlocked: false
  },
  {
    id: 3,
    name: 'Fruit Basket',
    description: 'What fruits do you see?',
    questions: fruitQuestions,
    stars: 0,
    completed: false,
    unlocked: false
  },
  {
    id: 4,
    name: 'World Flags',
    description: 'Do you know which countries these flags belong to?',
    questions: flagQuestions,
    stars: 0,
    completed: false,
    unlocked: false
  }
];