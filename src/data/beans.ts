import type { BeanDefinition, BeanId } from '../types/market'

export const beanCatalog: BeanDefinition[] = [
  {
    id: 'blue',
    name: 'Blue Bean',
    ticker: 'BLU',
    hue: '#4f7cff',
    baseValue: 1,
    volatility: 1.1,
    tagline: 'safe haven with cult loyalty',
  },
  {
    id: 'chili',
    name: 'Chili Bean',
    ticker: 'CHI',
    hue: '#ff5a3d',
    baseValue: 1,
    volatility: 1.4,
    tagline: 'high heat, higher expectations',
  },
  {
    id: 'stink',
    name: 'Stink Bean',
    ticker: 'STK',
    hue: '#7c8b2f',
    baseValue: 1,
    volatility: 1.3,
    tagline: 'hated by analysts, loved by chaos traders',
  },
  {
    id: 'green',
    name: 'Green Bean',
    ticker: 'GRN',
    hue: '#27b36a',
    baseValue: 1,
    volatility: 0.9,
    tagline: 'steady volume with suspicious optimism',
  },
  {
    id: 'soy',
    name: 'Soy Bean',
    ticker: 'SOY',
    hue: '#d0b04d',
    baseValue: 1,
    volatility: 1,
    tagline: 'quiet until it suddenly is not',
  },
  {
    id: 'blackEyed',
    name: 'Black-Eyed Bean',
    ticker: 'BEB',
    hue: '#2b2a33',
    baseValue: 1,
    volatility: 1.15,
    tagline: 'moody fundamentals, strong meme potential',
  },
  {
    id: 'red',
    name: 'Red Bean',
    ticker: 'RED',
    hue: '#d1495b',
    baseValue: 1,
    volatility: 1.05,
    tagline: 'retail favorite with shaky conviction',
  },
  {
    id: 'garden',
    name: 'Garden Bean',
    ticker: 'GRD',
    hue: '#7fb069',
    baseValue: 1,
    volatility: 0.85,
    tagline: 'respectable, until the bubble rumors start',
  },
]

export const beanIds = beanCatalog.map((bean) => bean.id)

export const beanById: Record<BeanId, BeanDefinition> = Object.fromEntries(
  beanCatalog.map((bean) => [bean.id, bean]),
) as Record<BeanId, BeanDefinition>