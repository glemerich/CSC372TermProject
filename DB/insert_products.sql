
INSERT INTO products (name, description, image_url, price, category_id, is_featured) VALUES
('Vintage Polaroid SX-70 Camera', 'Classic instant camera with a folding body.', '/images/polaroid.jpg', 299.99, 
    (SELECT id FROM categories WHERE name = 'Cameras'), 1),
('Tesla Cybertruck Diecast Model', 'High-quality diecast model of the futuristic vehicle.', '/images/cybertruck.jpg', 19.99, 
    (SELECT id FROM categories WHERE name = 'Toys'), 1),
('Handcrafted Damascus Steel Hunting Knife', 'Sharp and durable knife made from Damascus steel.', '/images/knife.jpg', 199.99, 
    (SELECT id FROM categories WHERE name = 'Outdoor'), 0),
('Fossilized Megalodon Shark Tooth', 'Rare fossil of a prehistoric Megalodon shark.', '/images/sharktooth.jpg', 149.99, 
    (SELECT id FROM categories WHERE name = 'Collectibles'), 1);
