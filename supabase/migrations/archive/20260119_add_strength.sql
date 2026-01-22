-- Add adjustment_strength to variant_reference_map
alter table variant_reference_map add column if not exists adjustment_strength float default 0.6;
