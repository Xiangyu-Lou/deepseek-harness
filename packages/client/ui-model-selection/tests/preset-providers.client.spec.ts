import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ModelCatalog } from '@deepseek-ai/dsh-api-remotes/client'
import { withoutPresetProviders } from '../src/client/catalog.ts'

const catalog: ModelCatalog = {
  default: { provider: 'custom', model: 'm' },
  routableProviders: ['custom'],
  groups: ['deepseek-account', 'deepseek-official', 'custom'].map(id => ({ id, name: id, models: [{ id: 'm', name: 'm' }] })),
  failures: [],
}

afterEach(() => { vi.unstubAllGlobals() })

describe('preset DeepSeek provider visibility', () => {
  it('hides the preset DeepSeek groups in the Desktop client', () => {
    vi.stubGlobal('dshDesktop', {})
    expect(withoutPresetProviders(catalog).groups.map(group => group.id)).toEqual(['custom'])
  })

  it('keeps every group outside Desktop', () => {
    expect(withoutPresetProviders(catalog)).toBe(catalog)
  })
})
