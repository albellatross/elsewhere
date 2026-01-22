-- Fix typo in variants table key
UPDATE variants 
SET key = 'blank_background' 
WHERE key = 'blank_backgroud';
