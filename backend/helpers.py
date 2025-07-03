import time
import functools

def time_profiler(func):
    """A decorator to measure the execution time of a function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"[Profiler] '{func.__name__}' executed in {end_time - start_time:.4f}s")
        return result
    return wrapper