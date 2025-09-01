import { z } from 'zod';

import { schedule } from '../schemas/scheduleAppointmentSchema';

export type scheduleSchemaType = z.infer<typeof schedule>;
