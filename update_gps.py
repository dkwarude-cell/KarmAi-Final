import re

filepath = r"KarmAI Mobile App Design\src\app\App.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will add a GPS pulsing UI when map view is active.
map_injection = r"""              <HorizontalZoomSlider
                zoomLevel={zoomLevel}
                onZoomChange={(level) => setZoomLevel(level)}
              />
            </motion.div>
          )}"""

new_map_injection = """              <HorizontalZoomSlider
                zoomLevel={zoomLevel}
                onZoomChange={(level) => setZoomLevel(level)}
              />
            </motion.div>
          )}
          
          {/* GPS Active Indicator */}
          {!hideMap && (
            <motion.div
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full border bg-white flex items-center gap-2 shadow-lg"
              style={{ borderColor: "#00CBA4" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="relative flex items-center justify-center w-3 h-3">
                <div className="absolute w-full h-full bg-[#00CBA4] rounded-full animate-ping opacity-75"></div>
                <div className="relative w-2 h-2 bg-[#00CBA4] rounded-full"></div>
              </div>
              <span className="text-[#1A1A1A] font-bold text-xs">Live GPS tracking active</span>
            </motion.div>
          )}"""

if "GPS Active Indicator" not in content:
    content = content.replace(map_injection, new_map_injection)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added GPS indicator!")
