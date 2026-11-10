import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { applyShiyouEnvironment, SHIYOU_HOME_DIR_NAME } from '../src/shiyou-environment.ts'

describe('Shiyou launch environment', () => {
  it('selects a Harness home separate from DeepSeek Harness and disables telemetry export', () => {
    const environment: NodeJS.ProcessEnv = {}
    expect(applyShiyouEnvironment(environment, '/users/a')).toBe(join('/users/a', SHIYOU_HOME_DIR_NAME))
    expect(environment).toEqual({ DSH_HOME: join('/users/a', '.shiyou'), DSH_TELEMETRY_DISABLED: '1' })
  })

  it('keeps values the launch already selected', () => {
    const environment: NodeJS.ProcessEnv = { DSH_HOME: '/custom', DSH_TELEMETRY_DISABLED: 'yes' }
    expect(applyShiyouEnvironment(environment, '/users/a')).toBe('/custom')
    expect(environment).toEqual({ DSH_HOME: '/custom', DSH_TELEMETRY_DISABLED: 'yes' })
  })

  it('treats empty values as unset', () => {
    const environment: NodeJS.ProcessEnv = { DSH_HOME: '', DSH_TELEMETRY_DISABLED: '' }
    expect(applyShiyouEnvironment(environment, '/users/a')).toBe(join('/users/a', '.shiyou'))
    expect(environment.DSH_TELEMETRY_DISABLED).toBe('1')
  })
})
