import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import { ShiyouMark, ShiyouName } from './ShiyouLogo.tsx'

/**
 * Render the Shiyou mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the Shiyou mark.
 */
export function OfficialBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return <ShiyouMark size={size} />
}

/**
 * Render the Shiyou name lettering without its independently slotted mark.
 * @returns the 识油 lettering.
 */
export function OfficialBrandName() {
  return <ShiyouName height={17} />
}

/**
 * Render the Shiyou mark leading the blank-home headline.
 * @param props - Host-supplied mark size and geometry class.
 * @returns the Shiyou mark.
 */
export function HeroBrandMark({ size, className }: HeroBrandMarkOwnerProps) {
  return <ShiyouMark size={size} className={className} />
}
