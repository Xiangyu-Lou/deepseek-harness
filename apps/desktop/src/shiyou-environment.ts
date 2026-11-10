/**
 * Shiyou launch environment, applied before any other module of the Electron main process loads.
 *
 * `DSH_HOME` defaults to `~/.shiyou`, so Shiyou never shares a Harness home, Desktop profile, or
 * Session store with an installed DeepSeek Harness. `DSH_TELEMETRY_DISABLED` defaults to `1`, so the
 * Host never exports feedback telemetry to the DeepSeek Harness collector. A launch that already sets
 * either variable keeps its value. The Host and every child process inherit the result.
 */

import { homedir } from 'node:os'
import { join } from 'node:path'

/** Directory name of the default Shiyou Harness home under the OS home. */
export const SHIYOU_HOME_DIR_NAME = '.shiyou'

/**
 * Fill the Shiyou defaults into an environment that leaves them unset or empty.
 * @param environment - process environment to update in place.
 * @param home - OS home directory.
 * @returns the effective Harness home.
 */
export function applyShiyouEnvironment(environment: NodeJS.ProcessEnv, home: string = homedir()): string {
  if (environment.DSH_TELEMETRY_DISABLED === undefined || environment.DSH_TELEMETRY_DISABLED === '') {
    environment.DSH_TELEMETRY_DISABLED = '1'
  }
  const configured = environment.DSH_HOME
  if (configured !== undefined && configured !== '') return configured
  const selected = join(home, SHIYOU_HOME_DIR_NAME)
  environment.DSH_HOME = selected
  return selected
}

applyShiyouEnvironment(process.env)
