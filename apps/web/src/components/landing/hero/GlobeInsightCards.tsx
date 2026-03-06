import { memo, useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../../../contexts/languageContext'

interface GlobeInsightSeed {
  id: number
  dotX: number
  dotY: number
  cardX: number
  cardY: number
  cardSide: 'left' | 'right'
}

type GlobeInsight = GlobeInsightSeed & {
  avatar: string
  name: string
  location: string
  text: string
  metric?: string
  metricLabel?: string
}

const INSIGHT_SEEDS: GlobeInsightSeed[] = [
  {
    id: 1,
    dotX: 30,
    dotY: 20,
    cardX: -8,
    cardY: 2,
    cardSide: 'left',
  },
  {
    id: 2,
    dotX: 52,
    dotY: 16,
    cardX: 58,
    cardY: 4,
    cardSide: 'right',
  },
  {
    id: 3,
    dotX: 78,
    dotY: 38,
    cardX: 62,
    cardY: 24,
    cardSide: 'right',
  },
  {
    id: 4,
    dotX: 36,
    dotY: 62,
    cardX: -4,
    cardY: 52,
    cardSide: 'left',
  },
  {
    id: 5,
    dotX: 68,
    dotY: 42,
    cardX: 66,
    cardY: 46,
    cardSide: 'right',
  },
]

const VISIBLE_COUNT = 2
const CYCLE_DURATION = 4500

export const GlobeInsightCards = memo(function GlobeInsightCards() {
  const { copy } = useLanguage()
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 2])

  const insights = useMemo<GlobeInsight[]>(() => {
    const translatedById = new Map<number, (typeof copy.globe.insights)[number]>(
      copy.globe.insights.map((item) => [item.id, item]),
    )

    return INSIGHT_SEEDS.map((seed) => {
      const translated = translatedById.get(seed.id)

      return {
        ...seed,
        avatar: translated?.avatar ?? 'US',
        name: translated?.name ?? 'Sentify Signal',
        location: translated?.location ?? '',
        text: translated?.text ?? '',
        metric: translated?.metric,
        metricLabel: translated?.metricLabel,
      }
    })
  }, [copy])

  useEffect(() => {
    let tick = 0
    const interval = window.setInterval(() => {
      tick += 1
      setActiveIndices((prev) => {
        const slot = tick % VISIBLE_COUNT
        const nextIndices = [...prev]
        let next = (nextIndices[slot] + VISIBLE_COUNT) % insights.length

        while (nextIndices.includes(next) && next !== nextIndices[slot]) {
          next = (next + 1) % insights.length
        }

        nextIndices[slot] = next
        return nextIndices
      })
    }, CYCLE_DURATION / VISIBLE_COUNT)

    return () => window.clearInterval(interval)
  }, [insights.length])

  return (
    <div className="globe-insight-layer" aria-hidden>
      {insights.map((insight, index) => {
        const isActive = activeIndices.includes(index)

        return (
          <div
            key={insight.id}
            className={`globe-insight-group ${isActive ? 'globe-insight-active' : ''}`}
          >
            <div
              className="globe-insight-dot"
              style={{ left: `${insight.dotX}%`, top: `${insight.dotY}%` }}
            >
              <span className="globe-insight-dot-core" />
              <span className="globe-insight-dot-ping" />
            </div>

            <svg className="globe-insight-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line
                x1={insight.dotX}
                y1={insight.dotY}
                x2={insight.cardX + 10}
                y2={insight.cardY + 4}
                className="globe-insight-line"
              />
            </svg>

            <div
              className={`globe-insight-card globe-insight-card-${insight.cardSide}`}
              style={{ left: `${insight.cardX}%`, top: `${insight.cardY}%` }}
            >
              <div className="globe-insight-card-header">
                <span className="globe-insight-avatar">{insight.avatar}</span>
                <div>
                  <div className="globe-insight-name">{insight.name}</div>
                  <div className="globe-insight-location">{insight.location}</div>
                </div>
                {insight.metric ? (
                  <div className="globe-insight-metric">
                    <span className="globe-insight-metric-value">{insight.metric}</span>
                    <span className="globe-insight-metric-label">{insight.metricLabel}</span>
                  </div>
                ) : null}
              </div>
              <p className="globe-insight-text">{insight.text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
})
