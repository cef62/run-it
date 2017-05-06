/* @flow */
import type { Spinner } from '../types'

import ora from 'ora'
import chalk from 'chalk'

const DEFAULT_SPINNER: string = '@@default_spinner@@'

const spinners: Map<string, Spinner> = new Map()

export function getSpinner(
  id: string,
  icon: string = 'dots',
  text: string = '',
): Spinner {
  if (!spinners.has(id)) {
    spinners.set(id, ora({ text, spinner: icon }))
  }
  // $FlowIgnore
  return spinners.get(id)
}

export function clearSpinner(id: string): boolean {
  return spinners.delete(id)
}

export function startSpinner(id: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  if (start) {
    sp.start()
  }
  return sp
}

export function log(text: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  sp.text = chalk.gray.dim(text)
  return startSpinner(DEFAULT_SPINNER, start)
}

export function info(text: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  sp.info(chalk.cyan(text))
  return startSpinner(DEFAULT_SPINNER, start)
}

export function succeed(text: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  sp.succeed(chalk.green.dim(text))
  return startSpinner(DEFAULT_SPINNER, start)
}

export function warn(text: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  sp.warn(chalk.yellow(text))
  return startSpinner(DEFAULT_SPINNER, start)
}

export function error(text: string, start: ?boolean): Spinner {
  const sp: Spinner = getSpinner(DEFAULT_SPINNER)
  sp.fail(chalk.red(text))
  return startSpinner(DEFAULT_SPINNER, start)
}
