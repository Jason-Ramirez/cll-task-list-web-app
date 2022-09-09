import { useState } from 'react';
import { useRouter } from 'next/router';
import GuestLayout from '../../layouts/GuestLayout';
import { $post } from '../../composables/fetch';
import Link from 'next/link';

export default () => {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  });
  
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const jsonResponse = await $post('/register', form);
      if (jsonResponse.success) {
        const { user } = jsonResponse.data;
        if (user && (Object.keys(user).length > 0)) {
          router.push('/login');
          return;
        }
      }
      throw 'Something went wrong!';
    } catch (error) {
      alert(error);
    }
    return false;
  }

  const handleForm = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  
  return (
    <GuestLayout>
      <div className="task container mx-auto pt-10">
        <form onSubmit={onSubmitForm} id="loginForm" className='mt-52'>
          <section className="">
            <div className="px-6 h-full text-gray-800">
              <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0 text-5xl">Create an Account!</p>
                  </div>

                  <div className="mb-6">
                    <input
                      onChange={handleForm}
                      name="first_name"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      onChange={handleForm}
                      name="last_name"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Last Name"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      onChange={handleForm}
                      name="email"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      onChange={handleForm}
                      name="password"
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="text-center lg:text-left">

                    <button
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      style={{ "backgroundColor": "#fd5186 !important" }}
                      type="submit"
                    >
                      Register
                    </button>

                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                      Already have an account?
                      <Link
                        href="/login"
                        className="text-blue-600  hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                      >
                        &nbsp;Login!
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </GuestLayout>
  )
}
