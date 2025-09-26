-- Remove the problematic policy that allows viewing other participants' location data
DROP POLICY IF EXISTS "Users can view visits of games they participate in" ON public.visits;

-- The remaining policies already secure the table:
-- 1. "Users can create their own visits" - allows INSERT only for own visits
-- 2. "Users can view their own visits" - allows SELECT only for own visits
-- This ensures users can only see their own location data, preventing tracking of other players