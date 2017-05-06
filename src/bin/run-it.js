#!/usr/bin/env node
/* @flow */

import yargs from 'yargs'
import { config as loadEnvFromFile } from 'dotenv'

loadEnvFromFile()
yargs.commandDir('../app/commands', { recurse: true }).demandCommand().help()
  .argv
