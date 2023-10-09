using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Edit
    {
        public class Command:IRequest{
            public Activity Activity { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity,act);

                await _context.SaveChangesAsync();
            }
        }




    }
}